const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Suppliers = prisma.supplier;

const getSuppliers = async () => {
  const suppliers = await Suppliers.findMany();
  return suppliers;
};

const getSupplierById = async (id) => {
  const supplier = await Suppliers.findUnique({
    where: {
      id,
    },
    include: {
      address: true,
    },
  });
  return supplier;
};

const getSupplierByUserId = async (user_id) => {
  const supplier = await Suppliers.findFirst({
    where: {
      user_id,
    },
  });

  return supplier;
};

// eslint-disable-next-line max-lines-per-function
const extractData = (suppliersData) => {
  const {
    cnpj,
    nire,
    company_name,
    trade_name,
    state_registration,
    cnae,
    phone,
    email,
    tech_manager,
    user_id,
    address_id,
  } = suppliersData;
  return {
    cnpj,
    nire,
    company_name,
    trade_name,
    state_registration,
    cnae,
    phone,
    email,
    tech_manager,
    user_id,
    address_id,
  };
};

const createSupplier = async (suppliersData) => {
  const extractedData = extractData(suppliersData);
  const newSupplier = await Suppliers.create({ data: extractedData });
  return newSupplier;
};

const updateSupplier = async (id, supplierData) => {
  const supplierUpdate = await Suppliers.findUnique({
    where: {
      id,
    },
  });
  if (supplierUpdate) {
    const supplierUpdated = await Suppliers.update({
      where: {
        id,
      },
      data: supplierData,
    });
    return supplierUpdated;
  }
};

const deleteSupplier = async (id) => {
  const foundSupplier = await Suppliers.findUnique({ where: { id } });
  if (foundSupplier) {
    await Suppliers.delete({ where: { id } });
    return foundSupplier;
  }
};

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierByUserId,
};
