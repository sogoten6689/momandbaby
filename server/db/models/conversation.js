'use strict';

module.exports = function (sequelize, DataTypes) {
    const Conversation = sequelize.define('Conversation',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            created_at: DataTypes.DATE,
            name: DataTypes.STRING,
        },
        {
            underscored: true,
            tableName: 'conversations',
            timestamps: false
        });
    Conversation.associate = function (models) {
        Conversation.Messages = Conversation.hasMany(models.Message, { foreignKey: 'conversation_id' });

    };

    return Conversation;
};