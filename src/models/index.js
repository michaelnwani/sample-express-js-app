// 'use strict';

var Sequelize = require('sequelize');
import path from 'path'

// Set up PostgreSQL connection
var sequelize = new Sequelize('<redacted_db_name>', '<redacted_username>', '<redacted_password>', {
  host: '<redacted_db_host>',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  ssl: true,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


console.log(`process.cwd(): ${process.cwd()}`);

const models = {
  // Answer: sequelize.import(path.join(__dirname, './answer.js')),
  Answer: require('./answer')(sequelize, Sequelize),
  Brand: require('./brand')(sequelize, Sequelize),
  Client: require('./client')(sequelize, Sequelize),
  ClientsGroup: require('./clients_group')(sequelize, Sequelize),
  Group: require('./group')(sequelize, Sequelize),
  PossibleAnswer: require('./possible_answer')(sequelize, Sequelize),
  Question: require('./question')(sequelize, Sequelize),
  QuestionsSurvey: require('./questions_survey')(sequelize, Sequelize),
  Reward: require('./reward')(sequelize, Sequelize),
  SurveyLocation: require('./survey_location')(sequelize, Sequelize),
  Survey: require('./survey')(sequelize, Sequelize),
  UsersMetadatum: require('./user_metadata')(sequelize, Sequelize),
  User: require('./user')(sequelize, Sequelize),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
