const express = require('express');
const { generatePdfFromTemplate } = require('./services/pdfGenerator');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '5mb' }));

app.post('/generate', async (req, res) => {
  const { template, data } = req.body;
  if (!template) return res.status(400).json({ error: 'template is required' });
  try {
    const pdfBuffer = await generatePdfFromTemplate(template, data || {});
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${template}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to generate pdf', message: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
