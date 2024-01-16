/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSchoolAndSupplierData = async (userId) => {
  // Busca todas as ofertas feitas pelo usuário
  const userOffers = await prisma.offer.findMany({
    where: {
      supplier: {
        userId: userId,
      },
    },
    include: {
      total_order: {
        select: {
          order: {
            select: {
              school_inep: true,
            },
          },
        },
      },
    },
  });
 
  // Extrai os INEPS das escolas associadas às ofertas do usuário
  const schoolIneps = userOffers.flatMap(offer => 
    offer.total_order.map(totalOrder => totalOrder.order.school_inep)
  );
 
  // Busca todas as escolas com os INEPS extraídos
  const userSchools = await prisma.school.findMany({
    where: {
      inep: {
        in: schoolIneps,
      },
    },
    include: {
      orders: {
        where: {
          school_inep: {
            in: schoolIneps,
          },
        },
        include: {
          total_order: {
            include: {
              offer: {
                select: {
                 supplier: {
                   select: {
                     company_name: true,
                   },
                 },
                 total_price: true,
                },
              },
            },
          },
        },
      },
    },
  });
 
  await prisma.$disconnect()
  return userSchools;
 };

module.exports = {
  getSchoolAndSupplierData,
};
