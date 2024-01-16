/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSchoolOffersByUserId = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        school_user: {
          select: {
            school_inep: true,
          },
        },
      },
    });

    if (user.school_user.length === 0) {
      throw new Error('User not found');
    }

    const schoolOffers = await prisma.offer.findMany({
      where: {
        total_order: {
          some: {
            order: {
              school_inep: user.school_user[0].school_inep,
            },
          },
        }
      },
      select: {
        id: true,
        supplier: {
          select: {
            id: true,
            company_name: true,
          },
        },
        total_price: true,
      },
    });

    return schoolOffers;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


const getOfferFoodById = async (userId, supplier_id, cycle_id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        school_user: {
          select: {
            school_inep: true,
          },
        },
      },
    });

    const supplier = await prisma.supplier.findUnique({
      where: {
        id: supplier_id,
      },
      select: {
        id: true,
        company_name: true,
      },
    });

    if (!user || !supplier) {
      return {error: 'User or supplier not found'};
    }

    if(!user.school_user[0]){
      return {error: 'User is not a school user'};
    }

    const school_inep = user.school_user[0].school_inep;

    const totalOrders = await prisma.total_Order.findMany({
      where: {
        order: {
          school_inep,
          cycle_id,
        },
      },
      select: {
        id: true
      }
    })

    const offerFood = await prisma.offer.findMany({
      where: {
        supplier_id,
        total_order: {
          some: {
            id: {
              in: totalOrders.map((totalOrder) => totalOrder.id),
            },
          },
        }
      },
      select: {
        id: true,
        supplier_id: true,
        offered_products: {
          select: {
            product_price: true,
            brand: true,
            quantity: true,
            food: {
              select: {
                id: true,
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
        quantity: product.quantity,
        ...product.food,
      })),
    }));

    const totalProductPrice = modifiedOfferFood.reduce(
      (total, offer) =>
        total +
        offer.offered_products.reduce(
          (subTotal, product) => subTotal + product.product_price,
          0
        ),
      0
    );

    return {
      offers: modifiedOfferFood,
      totalProductPrice: totalProductPrice,
    };
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getSchoolOffersByUserId,
  getOfferFoodById,
};
