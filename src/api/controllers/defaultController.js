/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const { getDate } = require('../../utils/dateUtils');
const { getResetPasswordEmail } = require('../../utils/emailUtils');
const userService = require('../services/userService');
const defaultService = require('../services/defaultService');
const logsController = require('./logsController');
const acessService = require('../services/acessService');
require('dotenv').config();

const DATA_TABLE = 'Users';

// Reusable transporter for email functionality
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

// Common error handling middleware
const handleError = (error, res) => res.status(500).json({ error: 'Internal server error' });

const returnToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(422).json({ error: 'Token not informed' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(decoded);
  } catch (error) {
    handleError(error, res);
  }
};

// eslint-disable-next-line
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: 'Email or password not informed' });
    }

    const user = await userService.getUserbyEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const jwtToken = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' },
    );
    const lastLogin = getDate();
    await defaultService.updateLogin(user.id, lastLogin);
    await acessService.createAcess({ user_id: user.id });
    return res.status(200).json({ token: jwtToken, role: user.role, userId: user.id });
  } catch (error) {
    handleError(error, res);
  }
};

// eslint-disable-next-line
const registerUser = async (req, res) => {
  try {
    const { id, email, name, password, role } = req.body;
    if (!id || !email || !name || !password || !role) {
      return res.status(422).json({ error: 'One or more fields not informed' });
    }

    if (await userService.getUserbyEmail(email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const lastLogin = getDate();
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = { id, email, name, password: hashedPassword, role, lastLogin };
    const registeredUser = await userService.createUser(userData);
    logsController.creationLog(userData, DATA_TABLE, id);
    return res.status(201).json(registeredUser);
  } catch (error) {
    handleError(error, res);
  }
};

// eslint-disable-next-line max-lines-per-function, complexity
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (!id || !password) {
      return res.status(422).json({ error: 'One or more fields not informed' });
    }
    const user = await userService.getUserbyId(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res
        .status(401)
        .json({ error: 'Utilize uma senha diferente das anteriores' });
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      email: user.email,
      name: user.name,
      hashedPassword,
      role: user.role,
    };
    const updatedUser = await userService.updateUser(id, userData);
    logsController.updateLog(user, userData, DATA_TABLE, id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    handleError(error, res);
  }
};

// eslint-disable-next-line max-lines-per-function
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: 'Email not informed' });
  }
  try {
    const user = await userService.getUserbyEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    const url = `${process.env.FRONTEND_URL}/nova-senha?token=${token}`;

    const mailOptions = {
      from: 'Serviços cadMerenda',
      to: email,
      subject: 'Redefinir sua senha do cadMerenda',
      html: getResetPasswordEmail(user, url),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error });
      }
      console.log('Email sent', info.response);
      return res.status(200).json({ message: 'Email sent' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const extractInfoFromToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(422).json({ error: 'Token not informed' });
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserbyId(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  returnToken,
  forgotPassword,
  extractInfoFromToken,
};
