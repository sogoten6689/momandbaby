'use strict';

module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('Comment',
        {
            id: {type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true},
            created_at: DataTypes.DATE,
            content: DataTypes.STRING,
            topic_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
        },
        {
            underscored: true,
            tableName: 'comments',
            timestamps: false
        });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Topic, {foreignKey: 'topic_id'});
        Comment.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return Comment;
};