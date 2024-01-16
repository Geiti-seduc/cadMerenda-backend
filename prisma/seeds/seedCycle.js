const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');
const path = require('path');
const { calculateDate } = require('../../src/utils/dateUtils');

const prisma = new PrismaClient();

function calculateOffset(field, cycleInfo) {
  return { [field]: calculateDate(cycleInfo[`${field}Offset`]) };
}

function calculateOffsets(cycleInfo) {
  const offsetFields = [
    'startNutri',
    'deadlineNutri',
    'startSchool',
    'deadlineSchool',
    'startSupplier',
    'deadlineSupplier',
    'initSelectSupplier',
    'deadlineSelectSupplier',
  ];

  return offsetFields.reduce((acc, field) => ({ ...acc, ...calculateOffset(field, cycleInfo) }), {
    
  });
}

function applyDateOffsets(cycleInfo) {
  const { id, ...offsets } = cycleInfo;
  return { id, ...calculateOffsets(offsets) };
}

async function readCycleData() {
  const filePath = path.resolve(__dirname, './dataSeed/cycleData.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function createCycleItem(cycleInfo) {
  return prisma.cycle.upsert({
    where: { id: cycleInfo.id },
    update: {},
    create: applyDateOffsets(cycleInfo),
  });
}

async function createCycles() {
  const cycleData = await readCycleData();
  const cycles = await Promise.all(cycleData.map(createCycleItem));
  return cycles;
}

module.exports = {
  createCycles,
};
