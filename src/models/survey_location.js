module.exports = (sequelize, DataTypes) => {
  var SurveyLocation = sequelize.define('survey_locations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    },
    distance: {
      type: DataTypes.FLOAT,
      defaultValue: 1.0,
      allowNull: false
    },
    survey_id: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true
  });

  return SurveyLocation;
};
