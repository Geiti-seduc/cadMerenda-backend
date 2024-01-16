const { PrismaClient } = require('@prisma/client');
const offersData = require('./dataSeed/offerData.json');

const prisma = new PrismaClient();

async function createOffer() {
    const offers = await Promise.all(offersData.map(async (offerData) => {
        const offer = await prisma.offer.upsert({
            where: { id: offerData.id },
            update: {},
            create: offerData,
        });
        return offer;
    }));
    return offers;
}

module.exports = {
    createOffer,
  };