const { PrismaClient } = require('@prisma/client');
const suppliersData = require('./dataSeed/supplierData.json');

const prisma = new PrismaClient();

async function createSuppliers() {
  const suppliers = Promise.all(suppliersData.map(async (supplierData) => {
    const supplier = prisma.supplier.upsert({
      where: { id: supplierData.id },
      update: {},
      create: supplierData,
    });
    return supplier;
  }));
  return suppliers;
}

module.exports = {
  createSuppliers,
};