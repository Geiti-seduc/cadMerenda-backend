const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Certificate = prisma.certificate;

const getCertificate = async () => {
  const certificateAll = await Certificate.findMany();
  return certificateAll;
};

const getCertificateById = async (certificate_id) => {
  const certificate = await Certificate.findUnique({
    where: {
      id: certificate_id,
    },
  });

  return certificate;
};

const extractCertificateData = (certificateData) => {
  const { required_certificate_id, expiration, archive, user_id } = certificateData;

  return {
    required_certificate_id,
    expiration,
    archive,
    user_id,
  };
};

const createCertificate = async (certificateData) => {
  const extractedData = extractCertificateData(certificateData);
  const newCertificate = await Certificate.create({ data: extractedData });
  return newCertificate;
};

const updateCertificate = async (certificate_id, certificateData) => {
  const certificateToUpdate = await Certificate.findUnique({
    where: {
      id: certificate_id,
    },
  });

  if (certificateToUpdate) {
    await Certificate.update({
      where: {
        id: certificate_id,
      },
      data: certificateData,
    });

    return certificateToUpdate;
  }
  return null;
};

const deletedCertificate = async (certificate_id) => {
  const certificateDeleted = await Certificate.findUnique({
    where: {
      id: certificate_id,
    },
  });
  if (certificateDeleted) {
    const certificateDel = await Certificate.delete({
      where: {
        id: certificate_id,
      },
    });
    return certificateDel;
  }
};

const updateCertificatebyRequiredCertificateId = async (
  required_certificate_id, user_id, certificateData) => {
  const certificateToUpdate = await Certificate.findUnique({
    where: {
      required_certificate_id,
      user_id,
    },
  });
  if (certificateToUpdate) {
    await certificateToUpdate.update({
      where: {
        required_certificate_id,
        user_id,
      },
      data: certificateData,
    });
    return certificateToUpdate;
  }
  return null;
};

const getCertificateByRequiredCertificateId = async (required_certificate_id, user_id) => {
  const certificate = await Certificate.findMany({
    where: {
      required_certificate_id,
      user_id,
    },
  });
  return certificate;
};

const getCertificateByUserId = async (user_id) => {
  const certificate = await Certificate.findMany({
    where: {
      user_id,
    },
  });
  return certificate;
};

module.exports = {
  getCertificate,
  getCertificateById,
  getCertificateByRequiredCertificateId,
  getCertificateByUserId,
  createCertificate,
  updateCertificate,
  updateCertificatebyRequiredCertificateId,
  deletedCertificate,
};
