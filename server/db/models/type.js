'use strict';

module.exports = function (sequelize, DataTypes) {
    const Type = sequelize.define('Type',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            parent_id: DataTypes.STRING,
            name: DataTypes.STRING
        }, {
            underscored: true,
            tableName: 'types',
            timestamps: false
        });

    Type.associate = function (models) {
        Type.Topics = Type.hasMany(models.Topic, {foreignKey: 'type_id'});
        Type.Children = Type.hasMany(models.Type, {foreignKey: 'parent_id', as: 'Children'});
        Type.Parent = Type.belongsTo(models.Type, {foreignKey: 'parent_id', as: 'Parent'});
    };

    return Type;
};