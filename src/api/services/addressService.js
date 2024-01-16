const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Address = prisma.address;

const getAddress = async () => {
  const allAddress = await Address.findMany();
  return allAddress;
};

const getAddressById = async (address_id) => {
  const addressId = await prisma.address.findUnique({
    where: {
      id: address_id,
    },
  });
  return addressId;
};

const extractAddressData = (addressData) => {
  const {
  id, zip, street, number, complement, district, city, state, immediate_region, intermediate_region,
  } = addressData;

  return {
  id, zip, street, number, complement, district, city, state, immediate_region, intermediate_region,
  };
};

const createAddress = async (addressData) => {
  const extractedData = extractAddressData(addressData);
  const newAddress = await prisma.address.create({ data: extractedData });
  return newAddress;
};

const updateAddress = async (addressId, addressData) => {
  const addressIdd = await prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });
  if (!addressIdd) {
    throw new Error('Address not found');
  }

  const updatedAddress = await prisma.address.update({
    where: {
      id: addressId,
    },
    data: {
      ...addressData,
    },
  });
  return updatedAddress;
};

const deletedAddress = async (address_id) => {
  const addressDeleted = await prisma.address.findUnique({
    where: {
      id: address_id,
    },
  });
  if (addressDeleted) {
    await Address.delete({
      where: {
        id: address_id,
      },
    });
    return addressDeleted;
  }
};

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  deletedAddress,
};
