// open-docs.js
const opn = require('opn');
const nodemon = require('nodemon');

opn('http://localhost:3001/docs');
nodemon('./src/server.js');
