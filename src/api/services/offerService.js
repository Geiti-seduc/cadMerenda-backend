/* eslint-disable  */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Offer = prisma.offer;

const getOffers = async () => {
  const Offers = await Offer.findMany();
  return Offers;
};

const getOfferByCycle = async (cycle_id, supplier_id) => {
  const OfferByCycle = await Offer.findMany({
    where: {
      cycle_id,
      supplier_id,
    },
  });
  return OfferByCycle;
};

const getOfferById = async (id) => {
  const OfferById = await Offer.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      total_price: true,
      supplier_id: true,
      cycle_id: true,
      offered_products: {
        select: {
          product_price: true,
          frequency: true,
          food_id: true,
          quantity: true,
          brand: true,
          food: {
            select: {
              id: true,
              nmc: true,
              name: true,
              measure: true,
              category: true,
              description: true,
            },
          },
        },
      },
    },
  });

  const offerFormatted = {
    id: OfferById.id,
    total_price: OfferById.total_price,
    supplier_id: OfferById.supplier_id,
    cycle_id: OfferById.cycle_id,
    offered_products: OfferById.offered_products.map((offered) => ({
      product_price: offered.product_price,
      food_id: offered.food_id,
      nmc: offered.food.nmc,
      quantity: offered.quantity,
      frequency: offered.frequency,
      brand: offered.brand,
      name: offered.food.name,
      measure: offered.food.measure,
      category: offered.food.category,
      description: offered.food.description,
    })),
  };
  return offerFormatted;
};

const getTotalOrdersByInepAndCycle = async (school_inep, cycle_id) => {
  const orders = await prisma.order.findMany({
    where: {
      school_inep,
      cycle_id,
    },
    select: {
      id: true,
    },
  });

  const arrayOrder = [];
  await Promise.all(
    orders.map(async (order) => {
      const total = await prisma.total_Order.findMany({
        where: {
          order_id: order.id,
        },
        select: {
          offer_id: true,
        },
      });
      total.map((total) => {
        if (total.offer_id && !arrayOrder.includes(total.offer_id)) {
          arrayOrder.push(total.offer_id);
        }
      });
    }),
  );
  const filteredOrders =
    arrayOrder.length > 0 ? arrayOrder.filter(Boolean) : [];
  return filteredOrders;
};

const getOfferByInepAndSupplier = async (
  school_inep,
  supplier_id,
  cycle_id,
) => {
  const filteredTotalOrders = await getTotalOrdersByInepAndCycle(
    school_inep,
    cycle_id,
  );
  const offerByInepAndSupplier = await Offer.findMany({
    where: {
      id: {
        in: filteredTotalOrders.map((total) => total),
      },
      supplier_id,
    },
    select: {
      id: true,
      total_price: true,
      supplier_id: true,
      cycle_id: true,
      offered_products: {
        select: {
          product_price: true,
          food_id: true,
          quantity: true,
          frequency: true,
          brand: true,
          food: {
            select: {
              id: true,
              name: true,
              nmc: true,
              measure: true,
              category: true,
              description: true,
            },
          },
        },
      },
    },
  });

  const formattedOfferBySupplierAndInep = offerByInepAndSupplier.map(
    (offer) => {
      const formattedOffer = {
        id: offer.id,
        total_price: offer.total_price,
        supplier_id: offer.supplier_id,
        cycle_id: offer.cycle_id,
        offered_products: offer.offered_products.map((offered) => ({
          product_price: offered.product_price,
          food_id: offered.food_id,
          nmc: offered.food.nmc,
          quantity: offered.quantity,
          frequency: offered.frequency,
          brand: offered.brand,
          name: offered.food.name,
          measure: offered.food.measure,
          category: offered.food.category,
          description: offered.food.description,
        })),
      };
      return formattedOffer;
    },
  );

  return formattedOfferBySupplierAndInep;
};

const getSupplierOffers = async (userId) => {
  try {
    const offerFood = await prisma.offer.findMany({
      where: {
        supplier_id: userId,
      },
      select: {
        id: true,
        supplier_id: true,
        offered_products: {
          select: {
            product_price: true,
            brand: true,
            food: {
              select: {
                id: true,
                nmc: true,
                name: true,
                description: true,
                measure: true,
              },
            },
          },
        },
      },
    });

    const modifiedOfferFood = offerFood.map((offer) => ({
      ...offer,
      offered_products: offer.offered_products.map((product) => ({
        product_price: product.product_price,
        brand: product.brand,
        ...product.food,
      })),
    }));

    const totalProductPrice = modifiedOfferFood.reduce(
      (total, offer) =>
        total +
        offer.offered_products.reduce(
          (subTotal, product) => subTotal + product.product_price,
          0,
        ),
      0,
    );

    return {
      offers: modifiedOfferFood,
      totalProductPrice,
    };
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

const createOffer = async (OfferData) => {
  const newOffer = await Offer.create({
    data: OfferData,
  });
  return newOffer;
};

const updateOffer = async (id, OfferData) => {
  const oldOffer = await Offer.findUnique({ where: { id } });
  if (oldOffer) {
    const updatedOffer = await Offer.update({
      where: { id },
      data: OfferData,
    });

    return updatedOffer;
  }
  return null;
};

const deleteOffer = async (id) => {
  const deletedOffer = await Offer.findUnique({ where: { id } });
  if (deletedOffer) {
    await Offer.delete({ where: { id } });
    return deletedOffer;
  }
};

const getOfferBySupplierId = async (id, cycle_id) => {
  const OfferBySupplierId = await Offer.findMany({
    where: {
      supplier: {
        user_id: id,
      },
      cycle_id,
    },
    include: {
      total_order: true,
    },
    orderBy: {
      updatedAt: 'desc',
    }
  });

  const totalOrders = OfferBySupplierId.map((offer) => offer.total_order);

  
  const isTotalOrdersEmpty = totalOrders.every(order => order.length === 0);
  if(isTotalOrdersEmpty) return [];

  const ordersPromises = OfferBySupplierId.map(async (offer) => {
    if(!offer.total_order) return null;
    const orderIds = offer.total_order.map((total) => total.order_id);
    const orders = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      select: {
        school: {
          select: {
            inep: true,
            name: true,
          },
        },
      },
    });
    return orders;
  });

  const ordersArray = await Promise.all(ordersPromises);

  for (let i = 0; i < OfferBySupplierId.length; i++) {
    if (ordersArray[i] && ordersArray[i][0]) {
      OfferBySupplierId[i].school = ordersArray[i][0].school;
    }
  }
  

  return OfferBySupplierId;
};


const getOffersByInep = async (school_inep, cycle_id) => {
  const filteredTotalOrders = await getTotalOrdersByInepAndCycle(
    school_inep,
    cycle_id,
  );
  const offersByInep = await Offer.findMany({
    take: 3,
    where: {
      id: {
        in: filteredTotalOrders.map((total) => total),
      },
    },
    orderBy: {
      total_price: 'asc',
    },
    select: {
      id: true,
      total_price: true,
      supplier_id: true,
      cycle_id: true,
      supplier: {
        select: {
          trade_name: true,
        },
      },
      offered_products: {
        select: {
          product_price: true,
          food_id: true,
          quantity: true,
          brand: true,
          food: {
            select: {
              id: true,
              nmc: true,
              name: true,
              measure: true,
              category: true,
              description: true,
            },
          },
        },
      },
    },
  });

  const formatedOffersByInep = offersByInep.map((offer) => ({
    id: offer.id,
    total_price: offer.total_price,
    supplier_id: offer.supplier_id,
    cycle_id: offer.cycle_id,
    supplier: offer.supplier.trade_name,
    offered_products: offer.offered_products.map((offered) => ({
      product_price: offered.product_price,
      food_id: offered.food_id,
      nmc: offered.food.nmc,
      quantity: offered.quantity,
      brand: offered.brand,
      name: offered.food.name,
      measure: offered.food.measure,
      category: offered.food.category,
      description: offered.food.description,
    })),
  }));

  return formatedOffersByInep;
};

const getCountOffersByInep = async (school_inep, cycle_id) => {
  const filteredTotalOrders = await getTotalOrdersByInepAndCycle(
    school_inep,
    cycle_id,
  );
  const countOffersByInep = await Offer.count({
    where: {
      id: {
        in: filteredTotalOrders.map((total) => total),
      },
    },
  });
  return countOffersByInep;
};

const getSchoolsFromSupplierOffer = async (supplier_id, cycle_id) => {
  const schools = [];
  const offers = await getOfferBySupplierId(supplier_id, cycle_id);
  offers.map((offer) => {
    if (!schools.includes(offer.school)) {
      schools.push(offer.school);
    }
  });
  return schools;
};

module.exports = {
  getOffers,
  getOfferById,
  getOfferBySupplierId,
  getOfferByInepAndSupplier,
  getSupplierOffers,
  getOfferByCycle,
  getOffersByInep,
  getCountOffersByInep,
  getSchoolsFromSupplierOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};
