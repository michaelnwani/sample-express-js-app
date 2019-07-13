import indexRouter    from './routes/index'
import loginRouter    from './routes/session/login/index'
import logoutRouter   from './routes/session/logout/index'
import privacyRouter  from './routes/privacy'
import signupRouter   from './routes/signup'
import surveysRouter  from './routes/surveys'
import clientsRouter  from './routes/clients'
import rewardsRouter  from './routes/rewards'

// module.exports = function applyMiddleware(app) {
//   console.log('applyMiddleware');

//   app.use('/', indexRouter);
//   app.use('/privacy', privacyRouter);
//   app.use('/signup', signupRouter);
//   app.use('/login', loginRouter);
//   app.use('/logout', logoutRouter);
//   app.use('/surveys', surveysRouter);
//   app.use('/clients', clientsRouter);
//   app.use('/rewards', rewardsRouter);
// }

export function applyMiddleware(app) {
  console.log('applyMiddleware');

  app.use('/', indexRouter);
  app.use('/privacy', privacyRouter);
  app.use('/signup', signupRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/surveys', surveysRouter);
  app.use('/clients', clientsRouter);
  app.use('/rewards', rewardsRouter);
}
