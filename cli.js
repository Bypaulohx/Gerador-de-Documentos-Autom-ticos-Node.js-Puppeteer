#!/usr/bin/env node
const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { generatePdfFromTemplate } = require('./services/pdfGenerator');

program
  .requiredOption('-t, --template <name>', 'template name (without extension)')
  .requiredOption('-d, --data <fileOrJson>', 'path to json file with data or raw json string')
  .option('-o, --output <file>', 'output PDF file', 'output.pdf');

program.parse(process.argv);

async function main() {
  const opts = program.opts();
  let data;
  try {
    const dataArg = opts.data;
    if (fs.existsSync(dataArg)) {
      data = JSON.parse(fs.readFileSync(dataArg, 'utf8'));
    } else {
      data = JSON.parse(dataArg);
    }
  } catch (err) {
    console.error('Erro ao ler JSON de dados:', err.message);
    process.exit(1);
  }

  try {
    await generatePdfFromTemplate(opts.template, data, path.resolve(opts.output));
    console.log('PDF gerado em', path.resolve(opts.output));
  } catch (err) {
    console.error('Erro ao gerar PDF:', err.message);
    process.exit(1);
  }
}

main();
