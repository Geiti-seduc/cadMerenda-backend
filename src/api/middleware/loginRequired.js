/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const User = prisma.user;

function loginRequired(allowedRoles = []) {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      console.log('You must be logged to access.');
      return res.status(401).json({ message: 'You must be logged to access.' });
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name } = payload;

      const user = await User.findUnique({
        where: {
          id,
          name,
        },
        select: {
          role: true,
        },
      });

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'User not found' });
      }

      allowedRoles.push('superadmin', 'admin');

      userRole = user.role;

      if (
        userRole == 'admin-nutri' &&
        (allowedRoles.includes('admin') ||
          allowedRoles.includes('nutricionista'))
      ) {
        allowedRoles.push('admin');
        userRole = 'admin';
      }

      if (allowedRoles.includes(userRole)) {
        req.userId = id;
        req.name = name;
        return next();
      } else {
        console.log('You are not allowed to access.');
        return res
          .status(403)
          .json({ message: 'You are not allowed to access.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token expired or invalid' });
    }
  };
}
module.exports = loginRequired;
