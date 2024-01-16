/* eslint-disable max-lines-per-function */
const fs = require('fs');
const puppeteer = require('puppeteer');
const certificateService = require('../services/certificateService');
const requiredCertificateService = require('../services/requiredCertificateService');
const offerService = require('../services/offerService');
const supplierService = require('../services/supplierService');
const { createReport } = require('../../utils/createReport');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';

function converterCaminho(caminho) {
  return caminho.replace(/\\/g, '/');
}

const downloadFile = async (req, res) => {
  const { id } = req.params;
  try {
    const certificate = await certificateService.getCertificateById(id);
    const requiredCertificate = await requiredCertificateService.getRequiredCertificateById(
        certificate.required_certificate_id,
      );
    const filePath = `${converterCaminho(certificate.archive)}/${
      requiredCertificate.name
    }.pdf`;

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const { range } = req.headers;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'application/octet-stream',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'application/octet-stream',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const downloadReport = async (req, res) => {
  const { inep, cycleId } = req.params;
  try {
    const offers = await offerService.getOffersByInep(inep, cycleId);
    const suppliersPromises = offers.map(async (offer) => {
      try {
        const supplier = await supplierService.getSupplierById(
          offer.supplier_id,
        );
        return supplier;
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
      }
    });
    const suppliers = await Promise.all(suppliersPromises);
    if (!offers || !suppliers) {
      return res.status(404).json({ error: 'Resource Not found' });
    }
    const htmlReport = createReport(offers, suppliers);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(htmlReport);
    const pdfBuffer = await page.pdf();
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=melhores_forncedores.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).end(pdfBuffer, 'binary');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  downloadFile,
  downloadReport,
};
