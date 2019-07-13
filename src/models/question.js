const Client = require('./client');

module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('questions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: "id"
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING
    },
    banner_width: {
      type: DataTypes.INTEGER
    },
    banner_height: {
      type: DataTypes.INTEGER
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return '/questions/' + this.id; // this.get('id')
      }
    },
    bannerModel: {
      type: DataTypes.VIRTUAL,
      get: function() {
        console.log('[question][bannerModel] constructing');
        return Object.assign(
          {},
          {
            bannerUrl: 'https://s3.amazonaws.com/app-anon/uploads/question/banner/' + this.id + '/' + this.banner,
            bannerType: function onBannerType() {
              // console.log('[bannerModel] [onBannerType]');
              // console.log(`[bannerModel] [onBannerType] this.bannerUrl: ${this.bannerUrl}`);
              var videoTypes = ['mp4', 'mpeg'];
              var pictureTypes = ['jpg', 'jpeg', 'png'];

              var urlSplit = this.bannerUrl.split('.');
              var mediaType = urlSplit[urlSplit.length-1];

              if (videoTypes.includes(mediaType)) {
                return 'video';
              } else if (pictureTypes.includes(mediaType)) {
                return 'image';
              }
              return 'gif';
            }
          }
        );
      }
    },
    bannerSrcUrl: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.get('bannerSrcUrl');
      },
      set: function(val) {
        this.setDataValue('bannerSrcUrl', val);
      }
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_questions_on_client_id',
        fields: ['client_id']
      }
    ]
  });

  Question.associate = models => {
    Question.hasMany(models.PossibleAnswer);
    Question.hasMany(models.Answer);
    Question.belongsToMany(models.Survey, { through: models.QuestionsSurvey });
  };

  return Question;
};
