const { PrismaClient } = require('@prisma/client');
const certificatesData = require('./dataSeed/certificateData.json');

const prisma = new PrismaClient();

async function createCertificate() {
  const certificates = await Promise.all(certificatesData.map(async (certificateData) => {
    const certificate = await prisma.certificate.upsert({
      where: { id: certificateData.id },
      update: {},
      create: certificateData,
    });
    return certificate;
  }));
  return certificates;
}

module.exports = {
  createCertificate,
};
