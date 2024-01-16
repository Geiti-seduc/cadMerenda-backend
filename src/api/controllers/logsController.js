/* eslint-disable */
const logsService = require('../services/logsService');

const creationLog = async (objectData, table, userId) => {
  try {
    const [firstField, referenceId] = Object.entries(objectData)[0];

    for (const [field, value] of Object.entries(objectData)) {
      if (
        field !== firstField &&
        field !== 'createdAt' &&
        field !== 'updatedAt' &&
        value !== null
      ) {
        const columnValue = typeof value !== 'string' ? String(value) : value;
        await logsService.createLog({
          table,
          column: field,
          operation: 'created',
          oldValue: null,
          newValue: columnValue,
          userId,
          referenceId,
        });
      }
    }
    console.log('Logs creation created');
  } catch (error) {
    console.error(error);
  }
};

const updateLog = async (oldData, newData, table, userId) => {
  try {
    const [firstField, referenceId] = Object.entries(oldData)[0];
    const fieldsToUpdate = Object.keys(oldData).filter(
      (field) =>
        field !== firstField &&
        field !== 'createdAt' &&
        field !== 'updatedAt' &&
        newData[field] !== null &&
        oldData[field] !== newData[field],
    );
    for (const field of fieldsToUpdate) {
      const oldValue =
        typeof oldData[field] !== 'string'
          ? String(oldData[field])
          : oldData[field];
      const newValue =
        typeof newData[field] !== 'string'
          ? String(newData[field])
          : newData[field];
          console.log('oldValue', oldValue);
          console.log('newValue', newValue);
          console.log('field', field);
      await logsService.createLog({
        table,
        column: field,
        operation: 'updated',
        oldValue,
        newValue,
        userId,
        referenceId,
      });
    }
    console.log('Logs update created');
  } catch (error) {
    console.error(error);
  }
};

const deleteLog = async (objectData, table, userId) => {
  try {
    if(!Array.isArray(objectData)) objectData = [objectData];
    const [firstField, referenceId] = Object.entries(objectData[0])[0];
    const fieldsToDelete = Object.keys(objectData[0]).filter(
      (field) =>
        field !== firstField &&
        field !== 'createdAt' &&
        field !== 'updatedAt' &&
        objectData[0][field] !== null,
    );
    for (const field of fieldsToDelete) {
      const oldValue =
        typeof objectData[0][field] !== 'string'
          ? String(objectData[0][field])
          : objectData[0][field];
      await logsService.createLog({
        table,
        column: field,
        operation: 'deleted',
        oldValue,
        newValue: null,
        userId,
        referenceId,
      });
    }
    console.log('Logs deleted created');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  creationLog,
  updateLog,
  deleteLog,
};
