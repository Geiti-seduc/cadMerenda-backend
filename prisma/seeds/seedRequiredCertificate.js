const { PrismaClient } = require('@prisma/client');
const requiredCertificatesData = require('./dataSeed/requiredCertificateData.json');

const prisma = new PrismaClient();

async function createRequiredCertificates() {
  const requiredCertificates = Promise.all(requiredCertificatesData.map(async (requiredData) => {
    const requiredCertificate = prisma.required_Certificates.upsert({
      where: { id: requiredData.id },
      update: {},
      create: requiredData,
    });
    return requiredCertificate;
  }));

  return requiredCertificates;
}

module.exports = {
  createRequiredCertificates,
};
