import express from 'express'
import errorHandler from 'errorhandler' // Dev-only
import 'dotenv/config'
import './public/stylesheets/style.scss'

// const FileStore = require('session-file-store')(session);
import pg from 'pg'
import session from 'express-session'
const PgSession = require('connect-pg-simple')(session);

const pgPool = new pg.Pool({
  // Insert pool options
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  ssl: true,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import uuid from 'uuid/v4'
import passport from './config/pp'
import { applyMiddleware } from './middleware.js'
import expressVue from 'express-vue'

const app = express();
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(session({
  genid: function(req) {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  store: new PgSession({
    pool: pgPool
  }),
  secret: 'work hard', // should be a randomly generated string
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false // recommended to keep this false. don't question it.
}));

app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set('views', [
  path.resolve(__dirname, 'views')
]);

app.set('view engine', 'pug');

// Configure our app
app.use(cors());
app.use(morgan('dev'));
const vueOptions = {
  rootPath: path.resolve(__dirname, 'views')
}
const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);
app.use(express.urlencoded({ extended: false })); // Use busboy/connect-busboy instead
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

applyMiddleware(app);

app.get('/authrequired', (req, res) => {
  console.log('[server.js] Inside GET /authrequired callback');
  console.log(`[server.js] User authenticated? ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    res.send('[server.js] you hit the authentication endpoint');
  } else {
    res.redirect('/');
  }
});

// Validate a user is authenticated, or redirect to /log-in
// router.get('*', validateAuth);

// use sessions for tracking logins


// Error handlers & middlewares

// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

app.listen(3000, () => console.log('Server running on http://localhost:3000/'));
