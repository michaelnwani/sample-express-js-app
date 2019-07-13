var models      = require('../models');
var express     = require('express');
var router      = express.Router();
var bcrypt      = require('bcrypt');
const passport  = require('../config/pp');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.loginGet = function onLoginGet(req, res) {
  console.log("[sessionController.js] req.session: " + req.session);
  // console.log("req.session.clientId: " + req.session.clientId);

  res.render('login_form', {title: 'Log in'});
};

// an array of middleware functions which the router will invoke.
exports.loginPost = [
  // Validate fields.
  // body('email', 'Email must not be empty.').isLength({min: 1}).trim(),
  // body('password', 'Password must not be empty.').isLength({min: 1}).trim(),

  // Sanitize fields (using wildcard).
  sanitizeBody('*').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // console.log(`[sessionController.js] Inside POST /login callback. req.body: ${req.body}`);
    console.log('foobar');
    Object.keys(req.body).forEach(key => {
      console.log(key + ": " + req.body[key]);
    });

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: There are errors. Render form again with sanitized values and error messages.
      res.render('login_form', { title: 'Log in', errors: errors.array() });
    } else {
      passport.authenticate('local', (err, user, info) => {
        console.log('[sessionController.js] Inside passport.authenticate() callback');
        if (info) {
          return res.send(info.message);
        }
        if (err) {
          console.log(`[sessionController.js] err: ${err}`);
          return next(err);
        }
        if (!user) {
          console.log('[sessionController.js] !user');
          return res.redirect('/login');
        }
        req.login(user, (err) => {
          console.log('[sessionController.js] Inside req.login()');
          console.log(`[sessionController.js] req.session.passport: ${JSON.stringify(req.session.passport)}`);
          console.log(`[sessionController.js] req.user: ${JSON.stringify(req.user)}`);
          if (err) {
            return next(err);
          }
          return res.redirect('/authrequired');
        });
      })(req, res, next);
    }
  }
];

exports.logout = function onLogout(req, res, next) {

};
