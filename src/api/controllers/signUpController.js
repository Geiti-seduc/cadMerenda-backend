/* eslint-disable max-lines-per-function */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const userService = require('../services/userService');
const supllierService = require('../services/supplierService');
// const addressService = require('../services/addressService');
const logsController = require('./logsController');
const { getDate } = require('../../utils/dateUtils');

const prisma = new PrismaClient();

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';

const createNewUser = async (req, res) => {
  const {
    cnpj,
    company_name,
    trade_name,
    state_registration,
    cnae,
    nire,
    phone,
    email,
    tech_manager,
    status,
    password,
    zip,
    street,
    number,
    complement,
    district,
    city,
    state,
    immediate_region,
    intermediate_region,
  } = req.body;

  const id = cnpj.replace(/\D/g, '');
  const role = 'fornecedor';
  const name = company_name;
  const lastLogin = getDate();

  const requiredFields = [
    id,
    email,
    name,
    password,
    role,
    zip,
    street,
    number,
    district,
    city,
    state,
  ];
  const missingFields = requiredFields.filter((field) => !field);

  if (missingFields.length > 0) {
    return res
      .status(422)
      .json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const isUser = await userService.getUserbyId(id);
    const isSupplier = await supllierService.getSupplierById(id);

    if (isUser || isSupplier) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const addressId = crypto.randomBytes(4).toString('hex');

    const result = await prisma.$transaction(async (innerPrisma) => {
      const newUser = await innerPrisma.user.create({
        data: {
          id,
          email,
          name,
          password: hashedPassword,
          role,
          lastLogin,
        },
      });
      logsController.creationLog(newUser, 'User', id);

      const newAddress = await innerPrisma.address.create({
        data: {
          id: addressId,
          zip,
          street,
          number,
          complement,
          district,
          city,
          state,
          immediate_region,
          intermediate_region,
        },
      });
      logsController.creationLog(newAddress, 'Address', id);

      const newSupplier = await innerPrisma.supplier.create({
        data: {
          cnpj,
          nire,
          company_name,
          trade_name,
          state_registration,
          cnae,
          phone,
          email,
          tech_manager,
          status,
          user_id: id,
          address_id: addressId,
        },
      });
      logsController.creationLog(newSupplier, 'Supplier', id);

      return { newAddress, newUser, newSupplier };
    });

    delete result.newUser.password;
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  createNewUser,
};
