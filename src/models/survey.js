const Reward = require('./reward');
const Brand = require('./brand');

module.exports = (sequelize, DataTypes) => {
  var Survey = sequelize.define('surveys', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Brand,
        key: "id"
      }
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING
    },
    reward_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Reward,
        key: "id"
      }
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    activated_at: {
      type: DataTypes.DATE
    },
    expires_at: {
      type: DataTypes.DATE
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    banner_width: {
      type: DataTypes.INTEGER
    },
    banner_height: {
      type: DataTypes.INTEGER
    },
    survey_type: {
      type: DataTypes.STRING,
      defaultValue: "default",
      allowNull: false
    },
    group_id: {
      type: DataTypes.BIGINT,
      defaultValue: 1
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return '/surveys/' + this.id; // this.get('id')
      }
    },
    bannerModel: {
      type: DataTypes.VIRTUAL,
      get: function() {
        console.log('[survey][bannerModel] constructing');
        return Object.assign(
          {},
          {
            bannerUrl: 'https://s3.amazonaws.com/app-anon/uploads/survey/banner/' + this.id + '/' + this.banner,
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
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_surveys_on_brand_id',
        fields: ['brand_id']
      },
      {
        name: 'index_surveys_on_client_id',
        fields: ['client_id']
      },
      {
        name: 'index_surveys_on_group_id',
        fields: ['group_id']
      },
      {
        name: 'index_surveys_on_reward_id',
        fields: ['reward_id']
      }
    ]
  });

  Survey.associate = models => {
    Survey.hasMany(models.SurveyLocation);
    Survey.hasMany(models.Answer);
    Survey.belongsTo(models.Brand);
    Survey.belongsTo(models.Client);
    Survey.belongsTo(models.Reward);
    Survey.belongsToMany(models.Question, { through: models.QuestionsSurvey });
  };

  return Survey;
};
