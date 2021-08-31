const express = require('express');
const massive = require('massive');
const session = require( 'express-session');
require('dotenv').config();
const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController');



const app = express();

const PORT = 4000;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  }
}).then((dbInstance) => {
  app.set('db', dbInstance)
  console.log('DB Ready')
});

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
}));

app.post('/auth/register', authCtrl.register);

app.post('/auth/login', authCtrl.login);

app.get('/auth/logout', authCtrl.logout);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));