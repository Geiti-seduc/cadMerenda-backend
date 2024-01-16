const express = require('express');

const app = express();

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

  // Rotas
// const userRoute = require('./api/routes/exempleRouter');
const userRouter = require('./api/routes/userRouter');

app.use('/users', userRouter);
// app.use('/exemples', userRoute);

module.exports = app;