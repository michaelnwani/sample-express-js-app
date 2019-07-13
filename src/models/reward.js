module.exports = (sequelize, DataTypes) => {
  var Reward = sequelize.define('rewards', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    brand_id: {
      type: DataTypes.INTEGER
    },
    winners_description: {
      type: DataTypes.STRING
    },
    lottery_style: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    lottery_ratio: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    delivery_method: {
      type: DataTypes.STRING
    },
    cash_value: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    fee: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    winners_banner: {
      type: DataTypes.STRING
    },
    default_description: {
      type: DataTypes.STRING
    },
    default_redeem_link: {
      type: DataTypes.STRING
    },
    default_banner: {
      type: DataTypes.STRING
    },
    default_banner_width: {
      type: DataTypes.INTEGER
    },
    default_banner_height: {
      type: DataTypes.INTEGER
    },
    winners_banner_width: {
      type: DataTypes.INTEGER
    },
    winners_banner_height: {
      type: DataTypes.INTEGER
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_rewards_on_brand_id',
        fields: ['brand_id']
      }
    ]
  });

  Reward.associate = models => {
    Reward.hasMany(models.Survey);
  };

  return Reward;
};
