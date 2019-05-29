'use strict';

module.exports = function (sequelize, DataTypes) {
    const Message = sequelize.define('Message',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            created_at: DataTypes.DATE,
            content: DataTypes.STRING,
            conversation_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER
        },
        {
            underscored: true,
            tableName: 'messages',
            timestamps: false
        });

    Message.associate = function (models) {
        Message.belongsTo(models.Conversation, {foreignKey: 'conversation_id'});
        Message.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return Message;
};