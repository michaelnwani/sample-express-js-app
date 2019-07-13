// Defines mappings between the Brand model and the brands table
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brands', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ios_app_id: {
      type: DataTypes.STRING
    },
    android_app_id: {
      type: DataTypes.STRING
    },
    site_url: {
      type: DataTypes.STRING
    },
    master_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false
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
        name: 'index_brands_on_android_app_id',
        fields: ['android_app_id'],
        unique: true
      },
      {
        name: 'index_brands_on_api_key',
        fields: ['api_key']
      },
      {
        name: 'index_brands_on_ios_app_id',
        fields: ['ios_app_id'],
        unique: true
      },
      {
        name: 'index_brands_on_master_email',
        fields: ['master_email'],
        unique: true
      }
    ]
  });

  Brand.associate = models => {
    Brand.hasMany(models.Survey, {
      foreignKey: {
        name: 'brand_id',
        allowNull: false
      }
    });

    Brand.hasMany(models.Client, {
      foreignKey: {
        name: 'brand_id',
        allowNull: false
      }
    });

    Brand.hasMany(models.Reward, {
      foreignKey: {
        name: 'brand_id',
        allowNull: false
      }
    });
  };

  return Brand;
}
