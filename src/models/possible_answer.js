// Defines mappings between the PossibleAnswer model and the possible_answers table
const Question = require('./question');

module.exports = (sequelize, DataTypes) => {
  const PossibleAnswer = sequelize.define('possible_answers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Question,
        key: 'id'
      }
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    freeform: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    banner: {
      type: DataTypes.STRING
    },
    banner_width: {
      type: DataTypes.INTEGER
    },
    banner_height: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_possible_answers_on_question_id',
        fields: ['question_id']
      }
    ]
  });

  PossibleAnswer.associate = models => {
    PossibleAnswer.belongsTo(models.Question);
  };

  return PossibleAnswer;
}
