// Defines mappings between the ClientsGroup model and the clients_groups table

module.exports = (sequelize, DataTypes) => {
  const ClientsGroup = sequelize.define('clients_groups', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.BIGINT
    },
    group_id: {
      type: DataTypes.BIGINT
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_clients_groups_on_client_id_and_group_id',
        fields: ['client_id', 'group_id'],
        unique: true
      },
      {
        name: 'index_clients_groups_on_client_id',
        fields: ['client_id']
      },
      {
        name: 'index_clients_groups_on_group_id',
        fields: ['group_id']
      }
    ]
  });

  return ClientsGroup;
}
