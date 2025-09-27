const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

async function generatePdfFromTemplate(templateName, data = {}, outputPath) {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.ejs`);
  const html = await ejs.renderFile(templatePath, data, { async: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    if (outputPath) fs.writeFileSync(outputPath, pdfBuffer);
    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

module.exports = { generatePdfFromTemplate };
