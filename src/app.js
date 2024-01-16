const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('../swaggerConfig');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

const addressRouter = require('./api/routes/addressRouter');
const foodRouter = require('./api/routes/foodRouter');
const schoolRouter = require('./api/routes/schoolRouter');
const school_userRouter = require('./api/routes/school_userRouter');
const supplierRouter = require('./api/routes/supplierRouter');
const userRouter = require('./api/routes/userRouter');
const defaultRouter = require('./api/routes/defaultRouter');
const certificateRouter = require('./api/routes/certificateRouter');
const orderRouter = require('./api/routes/orderRouter');
const offerRouter = require('./api/routes/offerRouter');
const general_listRouter = require('./api/routes/general_listRouter');
const modalityRouter = require('./api/routes/modalityRouter');
const geeRouter = require('./api/routes/geeRouter');
const requestedRouter = require('./api/routes/requestedRouter');
const offeredRouter = require('./api/routes/offeredRouter');
const general_list_foodRouter = require('./api/routes/general_list_foodRouter');
const school_modalityRouter = require('./api/routes/school_modalityRouter');
const uploadRouter = require('./api/routes/uploadRouter');
const schoolOfferRouter = require('./api/routes/schoolOfferRouter');
const schoolAndSupplierRouter = require('./api/routes/schoolAndSupplierRouter');
const schoolAndAccessRouter = require('./api/routes/schoolAndAccessRouter');
const userAndSchoolRouter = require('./api/routes/userAndSchoolRouter');
const requiredCertificates = require('./api/routes/requiredCertificateRouter');
const downloadRouter = require('./api/routes/downloadRouter');
const signUpRouter = require('./api/routes/signUpRouter');

const cycleRouter = require('./api/routes/cycleRouter');

app.use('/address', addressRouter);
app.use('/food', foodRouter);
app.use('/school', schoolRouter);
app.use('/school_user', school_userRouter);
app.use('/supplier', supplierRouter);
app.use('/user', userRouter);
app.use('/', defaultRouter);
app.use('/certificate', certificateRouter);
app.use('/order', orderRouter);
app.use('/offer', offerRouter);
app.use('/general_list', general_listRouter);
app.use('/modality', modalityRouter);
app.use('/gee', geeRouter);
app.use('/requested', requestedRouter);
app.use('/offered', offeredRouter);
app.use('/general_list_food', general_list_foodRouter);
app.use('/school_modality', school_modalityRouter);
app.use('/upload', uploadRouter);
app.use('/school-offer', schoolOfferRouter);
app.use('/school-for-supplier', schoolAndSupplierRouter);
app.use('/user-access', schoolAndAccessRouter);
app.use('/user-and-school', userAndSchoolRouter);
app.use('/required-certificate', requiredCertificates);
app.use('/download', downloadRouter);
app.use('/signUp', signUpRouter);

app.use('/cycle', cycleRouter);

// app.use('/exemples', userRoute);

module.exports = app;
