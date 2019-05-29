'use strict';

module.exports = function (sequelize, DataTypes) {
    const Topic = sequelize.define('Topic',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            title: DataTypes.STRING,
            content: DataTypes.STRING(100),
            summary: DataTypes.STRING,
            img: DataTypes.STRING,
            type_id: DataTypes.INTEGER,
            author_id: DataTypes.INTEGER,
            status: DataTypes.INTEGER,
            views: DataTypes.INTEGER,
            likes: DataTypes.INTEGER,
            dislikes: DataTypes.INTEGER,
            shares: DataTypes.INTEGER,
            active: DataTypes.INTEGER
        },
        {
            underscored: true,
            tableName: 'topics',
            timestamps: false
        });

    Topic.associate = function (models) {
        Topic.belongsTo(models.Type, {foreignKey: 'type_id'});
        Topic.belongsTo(models.User, {foreignKey: 'author_id'});
        Topic.Comments = Topic.hasMany(models.Comment, {foreignKey: 'topic_id'});
        Topic.Actions = Topic.hasMany(models.Action, {foreignKey: 'topic_id'});
        // Topic.Conversations = Topic.hasMany(models.Conversation, {foreignKey: 'topic_id'});
    }

    return Topic;
};
