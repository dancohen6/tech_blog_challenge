// IMPORT REQ'D MODULES //
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const db = require('./db/connection');

// DEFINE CONSTANTS //
const PORT = process.env.PORT || 3001;

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

// ROUTES //
const public_routes = require('./controllers/public_routes');
const auth_routes = require('./controllers/auth_routes');
const private_routes = require('./controllers/private_routes');
app.use('/', [public_routes, auth_routes, private_routes]);

// DB SYNC AND SERVER START //
db.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on port %s', PORT);
  });
});
