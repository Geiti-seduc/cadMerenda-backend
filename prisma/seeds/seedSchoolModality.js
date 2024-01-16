const { PrismaClient } = require('@prisma/client');
const schoolModalitysData = require('./dataSeed/schoolModalityData.json');

const prisma = new PrismaClient();

async function createSchoolModality() {
    const schoolModalitys = Promise.all(schoolModalitysData.map(async (schoolModalityData) => {
        const schoolModality = prisma.school_Modality.upsert({
            where: { id: schoolModalityData.id },
            update: {},
            create: schoolModalityData,
        });
        return schoolModality;
    }));
    return schoolModalitys;
}

module.exports = {
    createSchoolModality,
  };