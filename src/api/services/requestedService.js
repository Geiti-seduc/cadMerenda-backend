/* eslint-disable no-param-reassign */
/* eslint-disable max-lines-per-function */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Requested = prisma.requested_Products;

const getRequested = async () => {
  const allRequested = await Requested.findMany();
  return allRequested;
};

const getRequestedById = async (Requested_id) => {
  const RequestedId = await Requested.findUnique({
    where: {
      id: Requested_id,
    },
  });
  return RequestedId;
};

const getRequestedByFoodId = async (order_id, food_id) => {
  const RequestedId = await Requested.findMany({
    where: {
      order_id,
      food_id,
    },
  });
  if (!RequestedId || RequestedId.length <= 0) return null;
  return RequestedId[0];
};

const createRequested = async (RequestedData) => {
  const existingRequested = await Requested.findMany({
    where: {
      order_id: RequestedData.order_id,
      food_id: RequestedData.food_id,
    },
  });
  if (existingRequested.length > 0) {
    return { error: 'Food already exists in this order' };
  }
  RequestedData.quantity = Number(RequestedData.quantity);
  const newRequested = await Requested.create({
    data: RequestedData,
  });
  return newRequested;
};

const updateRequested = async (Requested_id, RequestedData) => {
  const RequestedId = await Requested.findUnique({
    where: {
      id: Requested_id,
    },
  });
  if (!RequestedId) throw new Error('Requested not found');

  const updatedRequested = await Requested.update({
    where: {
      id: Requested_id,
    },
    data: {
      ...RequestedData,
    },
  });
  return updatedRequested;
};

const updateRequestedByFoodId = async (order_id, food_id, RequestedData) => {
  const RequestedId = await Requested.findMany({
    where: {
      order_id,
      food_id,
    },
  });
  if (!RequestedId || RequestedId.length <= 0) return null;

  // tranformar quantity em number
  RequestedData.quantity = Number(RequestedData.quantity);
  
  const updatedRequested = await Requested.update({
    where: {
      id: RequestedId[0].id,
    },
    data: {
      ...RequestedData,
    },
  });
  return updatedRequested;
};

const deleteRequested = async (Requested_id) => {
  const RequestedDeleted = await Requested.findUnique({
    where: {
      id: Requested_id,
    },
  });

  if (!RequestedDeleted) throw new Error('Requested not found');

  const deletedRequested = await Requested.delete({
    where: {
      id: Requested_id,
    },
  });
  return deletedRequested;
};

const deleteRequestedByFoodId = async (order_id, food_id) => {
  const RequestedDeleted = await Requested.findMany({
    where: {
      order_id,
      food_id,
    },
  });
  if (!RequestedDeleted || RequestedDeleted.length <= 0) return null;
  await Requested.deleteMany({
    where: {
      id: RequestedDeleted[0].id,
    },
  });
  const RequestedDeletedFormatted = RequestedDeleted[0];
  return RequestedDeletedFormatted;
};

module.exports = {
  getRequested,
  getRequestedById,
  getRequestedByFoodId,
  createRequested,
  updateRequested,
  updateRequestedByFoodId,
  deleteRequested,
  deleteRequestedByFoodId,
};