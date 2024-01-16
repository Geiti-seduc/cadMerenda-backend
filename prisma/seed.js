/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const { createCycles } = require('./seeds/seedCycle');
const { seedUsers } = require('./seeds/seedUsers');
const { createAddresses } = require('./seeds/seedAddress');
const { createGees } = require('./seeds/seedGee');
const { createRequiredCertificates } = require('./seeds/seedRequiredCertificate');
const { createCertificate } = require('./seeds/seedCertificate');
const { createSuppliers } = require('./seeds/seedSupplier');
const { createFoods } = require('./seeds/seedFood');
const { createGeneralList } = require('./seeds/seedGeneralList');
const { createGeneralListFood } = require('./seeds/seedGeneralListFood');
const { createModality } = require('./seeds/seedModality');
const { createOffer } = require('./seeds/seedOffer');
const { createOrder } = require('./seeds/seedOrder');
const { createSchool } = require('./seeds/seedSchool');
const { createOfferedProducts } = require('./seeds/seedOfferedProducts');
const { createRequestedProducts } = require('./seeds/seedRequestedProducts');
const { createSchoolModality } = require('./seeds/seedSchoolModality');
const { createSchoolUser } = require('./seeds/seedSchoolUser');
const { createTotalOrder } = require('./seeds/seedTotalOrder');

const prisma = new PrismaClient();

async function main() {
  const addresses = await createAddresses();
  const users = await seedUsers();
  const cycle = await createCycles();
  const suppliers = await createSuppliers();
  const gees = await createGees();
  const foods = await createFoods();
  const modality = await createModality();
  const generalList = await createGeneralList();
  const generalListFood = await createGeneralListFood();
  const school = await createSchool();
  const order = await createOrder();
  const offer = await createOffer();
  const offerProducts = await createOfferedProducts();
  const requestedProducts = await createRequestedProducts();
  const totalOrder = await createTotalOrder();
  const schoolModality = await createSchoolModality();
  const schoolUser = await createSchoolUser();
  const requiredCertificate = await createRequiredCertificates();
  const certificates = await createCertificate();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });