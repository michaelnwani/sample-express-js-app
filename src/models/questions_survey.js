// TODO: maybe explicitly refer to survey_id and question_id as fkeys
const Survey = require('./survey')
const Question = require('./question')

module.exports = (sequelize, DataTypes) => {
  var QuestionsSurvey = sequelize.define('questions_surveys', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    survey_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Survey,
        key: "id"
      }
    },
    question_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Question,
        key: "id"
      }
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_questions_surveys_on_question_id',
        fields: ['question_id']
      },
      {
        name: 'index_questions_surveys_on_survey_id',
        fields: ['survey_id']
      }
    ]
  });

  return QuestionsSurvey;
};
