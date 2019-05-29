'use strict';

module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('Role',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      code: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'roles',
        timestamps: false
    });
  
  Role.associate = function (models) {
    Role.Users = Role.hasMany(models.User, { foreignKey: 'role_id' });
  };

  return Role;
};