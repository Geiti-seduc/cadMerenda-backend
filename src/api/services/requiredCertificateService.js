const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const RequiredCertificates = prisma.required_Certificates;
const { formatToBrazilDate } = require('../../utils/dateUtils');

const getRequiredCertificate = async () => {
  try {
    const getReqCertificates = await RequiredCertificates.findMany();
    return getReqCertificates;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRequiredCertificateById = async (id) => {
  try {
    const requiredCertificateId = await RequiredCertificates.findUnique({
      where: { id },
    });
    return requiredCertificateId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createRequiredCertificate = async (name) => {
  try {
    const newRequiredCertificate = await RequiredCertificates.create({
      data: {
        name,
      },
    });
    return newRequiredCertificate;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateRequiredCertificate = async (id, name) => {
  try {
    const updatedRequiredCertificate = await RequiredCertificates.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return updatedRequiredCertificate;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteRequiredCertificate = async (id) => {
  try {
    const deletedRequiredCertificate = await RequiredCertificates.delete({
      where: {
        id,
      },
    });
    return deletedRequiredCertificate;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// eslint-disable-next-line max-lines-per-function
const getRequiredCertificatesWithExpiration = async (id) => {
  try {
    // eslint-disable-next-line max-len
    const requiredCertificatesWithExpiration = await RequiredCertificates.findMany({
        select: {
          name: true,
          id: true,
          certificates: {
            select: {
              expiration: true,
              id: true,
            },
            where: {
              user_id: id,
            },
          },
        },
      });

    // Formate a data para o padrão brasileiro
    const formattedCertificates = requiredCertificatesWithExpiration.map(
      (certificate) => ({
        name: certificate.name,
        expiration:
          certificate.certificates[0].expiration && formatToBrazilDate(
            new Date(certificate.certificates[0].expiration),
            ),
        required_certificate_id: certificate.id,
        certificate_id: certificate.certificates[0].id,
      }),
    );

    return formattedCertificates;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCertificateIdByName = async (name) => {
  try {
    const certificateId = await RequiredCertificates.findUnique({
      where: {
        name,
      },
    });
    return certificateId.id;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getRequiredCertificate,
  getRequiredCertificateById,
  createRequiredCertificate,
  updateRequiredCertificate,
  deleteRequiredCertificate,
  getRequiredCertificatesWithExpiration,
  getCertificateIdByName,
};
