'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('comments', {
          id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
          created_at: Sequelize.DATE,
          content: Sequelize.STRING,
          topic_id: {
              type: Sequelize.INTEGER,
              references: {model: 'topics', key: 'id'}
          },
          user_id: {
              type: Sequelize.INTEGER,
              references: {model: 'users', key: 'id'}
          }
      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('comments');
  }
};
