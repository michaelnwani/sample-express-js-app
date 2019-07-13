// UsersMetadatum
module.exports = (sequelize, DataTypes) => {
  var UsersMetadatum = sequelize.define('users_metadata', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mobile_os: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    phone_number: {
      type: DataTypes.STRING
    },
    email_address: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_users_metadata_on_email_address',
        unique: true,
        fields: ['email_address']
      },
      {
        name: 'index_users_metadata_on_user_id',
        fields: ['user_id']
      }
    ]
  });

  return UsersMetadatum;
};
