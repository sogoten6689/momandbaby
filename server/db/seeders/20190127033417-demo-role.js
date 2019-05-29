'use strict';

module.exports = {
  up: (queryInterface) => {
      let t = new Date();

      let roles = [
          { code: 'admin', name: 'Admin', created_at: t, updated_at: t },
          { code: 'member', name: 'Member', created_at: t, updated_at: t }
      ];

      return queryInterface.bulkInsert('roles', roles);
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete('roles', null);
  }
};
