'use strict';

module.exports = function (sequelize, DataTypes) {
    const Action = sequelize.define('Action',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            created_at: DataTypes.DATE,
            action: DataTypes.STRING,
            topic_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER
        },
        {
            underscored: true,
            tableName: 'user-topic-action',
            timestamps: false
        });

    Action.associate = function (models) {
        Action.belongsTo(models.Topic, {foreignKey: 'topic_id'});
        Action.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return Action;
};