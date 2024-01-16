const { PrismaClient } = require('@prisma/client');
const modalitysData = require('./dataSeed/modalityData.json');

const prisma = new PrismaClient();

async function createModality() {
    const modalitys = await Promise.all(modalitysData.map(async (modalityData) => {
        const modality = await prisma.modality.upsert({
            where: { id: modalityData.id },
            update: {},
            create: modalityData,
        });
        return modality;
    }));
    return modalitys;
}

module.exports = {
    createModality,
};
