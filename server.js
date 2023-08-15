// IMPORT REQ'D MODULES //
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const db = require('./db/connection');

// DEFINE CONSTANTS //
const PORT = process.env.PORT || 3000;

// CREATE EXPRESS APP //
const app = express();

// MIDDLEWARE //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// SET UP HBS AS VIEW ENGINE //
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// SET UP SESSION /
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
