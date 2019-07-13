import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt'
import models from '../models'

// configure passport.js to use the local strategy
// this is run when passport.authenticate() is run.
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // aliasing the default 'username' field to be called 'email' essentially
  (email, password, done) => {
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // axios.get(`http://localhost:5000/users?email=${email}`)
    // .then(res => {
    //   const user = res.data[0];
    //   if (!user) {
    //     return done(null, false, { message: 'Invalid credentials.\n' });
    //   }

    //   if (!bcrypt.compareSync(password, user.password)) {
    //     return done(null, false, { message: 'Invalid credentials.\n' });
    //   }

    //   return done(null, user);
    // })
    // .catch(error => done(error));
    console.log(`[pp.js] email: ${email}, password: ${password}`)
    models.Client
    .findOne({
      where: { email: email }
    })
    .then(client => {
      console.log(`[pp.js] fetched client: ${JSON.stringify(client.get({ plain: true }))}`)
      if (!client) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }

      bcrypt
        .compare(password, client.password_digest)
        .then(function(res) {
          if (res === true) {
            console.log("[pp.js] client successfully authenticated");
            return done(null, client);
          }
          return done(null, false, { message: 'Invalid credentials.\n' });
        })
        .catch(error => done(error));

      // if (!bcrypt.compareSync(password, client.password_digest)) {
      //   return done(null, false, { message: 'Invalid credentials.\n' });
      // }

      // console.log('[pp.js] successful match!');
      // return done(null, client);
    });
  }
));

// tell passport how to serialize the user
// this is run (by req.login()) if authenticate is successful
passport.serializeUser((client, done) => {
  console.log('[pp.js] Inside serializeUser callback. client id is saved to the session file store here.');
  done(null, client.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);

  models.Client
  .findById(id)
  .then(client => {
    if (client) {
      return done(null, client);
    }
    return done(null, false);
  })

});

module.exports = passport;
