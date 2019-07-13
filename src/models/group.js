// Defines mappings between the Group model and the groups table
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('groups', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    indexes: [
      {
        name: 'index_groups_on_name',
        fields: ['name']
      }
    ]
  });

  Group.associate = models => {
    Group.hasMany(models.Survey, {
      foreignKey: {
        name: 'group_id',
        allowNull: false
      }
    });
  };

  return Group;
}
