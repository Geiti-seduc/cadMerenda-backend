const { PrismaClient } = require('@prisma/client');
const addressesData = require('./dataSeed/addressesData.json');

const prisma = new PrismaClient();

async function createAddresses() {
  const addresses = await Promise.all(addressesData.map(async (addressData) => {
    const address = await prisma.address.upsert({
      where: { id: addressData.id },
      update: {},
      create: addressData,
    });
    return address;
  }));
 
  return addresses;
}

module.exports = {
  createAddresses,
};