'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable('roles', {
            id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            code: {type: Sequelize.STRING, unique: true, allowNull: false},
            name: {type: Sequelize.STRING}
        })
            .then(function () {
                return queryInterface.createTable('users', {
                    id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
                    created_at: Sequelize.DATE,
                    updated_at: Sequelize.DATE,
                    account: {type: Sequelize.STRING, allowNull: false},
                    password: {type: Sequelize.STRING, allowNull: false},
                    fullname: {type: Sequelize.STRING, allowNull: false},
                    address: {type: Sequelize.STRING},
                    phone: {type: Sequelize.STRING},
                    email: {type: Sequelize.STRING, allowNull: false},
                    facebook_account:Sequelize.STRING,
                    twitter_account:Sequelize.STRING,
                    active: {type: Sequelize.BOOLEAN, defaultValue: true},
                    image_url: Sequelize.STRING,
                    role_id: {
                        type: Sequelize.INTEGER,
                        references: {model: 'roles', key: 'id'}
                    },
                    last_login: Sequelize.DATE
                });
            });

    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */

        return queryInterface.dropTable('users')
            .then(function () {
                return queryInterface.dropTable('roles');
            });
    }
};
