// Defines mappings between the Answer model and the answers table
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    survey_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    won: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_answers_on_question_id',
        fields: ['question_id']
      },
      {
        name: 'index_answers_on_survey_id',
        fields: ['survey_id']
      },
      {
        name: 'index_answers_on_user_id_and_survey_id_and_question_id_and_seq',
        fields: ['user_id', 'survey_id', 'question_id', 'seq']
      },
      {
        name: 'index_answers_on_user_id',
        fields: ['user_id']
      }
    ]
  });

  return Answer;
}
