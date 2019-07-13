// Defines mappings between the User model and the users table

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ref_id1: {
      type: DataTypes.STRING
    },
    ref_id2: {
      type: DataTypes.STRING
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phone: {
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    }
  }, {
    underscored: true
  });

  User.associate = models => {
    User.hasMany(models.UsersMetadatum, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });

    User.hasMany(models.Answer, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };

  return User;
};
