const { PrismaClient } = require('@prisma/client');
const schoolsData = require('./dataSeed/schoolData.json');

const prisma = new PrismaClient();

async function createSchool() {
  const schools = Promise.all(schoolsData.map(async (schoolData) => {
    const school = prisma.school.upsert({
      where: { inep: schoolData.inep },
      update: {},
      create: schoolData,
    });
    return school;
  }));

  return schools;
}

module.exports = {
  createSchool,
};