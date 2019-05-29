'use strict';

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            account: DataTypes.STRING,
            fullname: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            facebook_account: DataTypes.STRING,
            twitter_account: DataTypes.STRING,
            active: {type: DataTypes.INTEGER, defaultValue: 0},
            role_id: {type: DataTypes.INTEGER, defaultValue: 2},
            last_login: DataTypes.DATE,
            password: DataTypes.STRING,
            image_url: DataTypes.STRING
        },
        {
            classMethods: {
                associate: function (models) {
                    User.Role = User.belongsTo(models.Role, {foreignKey: 'role_id'});
                }
            },
            underscored: true,
            tableName: 'users',
            timestamps: false
        });

    User.associate = function (models) {
        User.belongsTo(models.Role,{foreignKey: 'role_id'});
        User.Comments = User.hasMany(models.Comment, {foreignKey: 'user_id'});
        User.Topics = User.hasMany(models.Topic, {foreignKey: 'author_id'});
        User.Actions = User.hasMany(models.Action, {foreignKey: 'user_id'});
    };

    return User;
};
