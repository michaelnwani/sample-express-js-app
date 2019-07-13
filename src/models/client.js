// Defines mappings between the Client model and the clients table
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('clients', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING
    },
    activation_digest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    activated_at: {
      type: DataTypes.DATE
    },
    reset_digest: {
      type: DataTypes.STRING
    },
    reset_sent_at: {
      type: DataTypes.DATE
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    remember_digest: {
      type: DataTypes.STRING
    },
    brand_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    reset_token: {
      type: DataTypes.STRING
    },
    activation_token: {
      type: DataTypes.STRING
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
        name: 'index_clients_on_brand_id',
        fields: ['brand_id']
      },
      {
        name: 'index_clients_on_email',
        fields: ['email'],
        unique: true
      }
    ]
  });

  Client.associate = models => {
    Client.hasMany(models.Survey);
    Client.hasMany(models.Question)
  };

  return Client;
}
