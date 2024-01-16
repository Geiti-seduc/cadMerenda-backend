const { PrismaClient } = require('@prisma/client');
const schoolUsersData = require('./dataSeed/schoolUserData.json');

const prisma = new PrismaClient();

async function createSchoolUser() {
    const schoolUsers = Promise.all(schoolUsersData.map(async (schoolUserData) => {
        const schoolUser = prisma.school_User.upsert({
            where: { id: schoolUserData.id },
            update: {},
            create: schoolUserData,
        });
        return schoolUser;
    }));
    return schoolUsers;
}

module.exports = {
    createSchoolUser,
  };