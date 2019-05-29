'use strict';

module.exports = {
  up: (queryInterface) => {
      let t = new Date();

      let types = [
          {name: 'Làm mẹ', created_at: t, updated_at: t },
          {name: 'Kinh nghiệm hay', created_at: t, updated_at: t },
          {name: 'Sức khỏe', created_at: t, updated_at: t },
          {name: 'Giải trí', created_at: t, updated_at: t },
          {name: 'Sách, truyện cho bé', parent_id: 4, created_at: t, updated_at: t },
          {name: 'Chữa bệnh cho bé', parent_id: 3, created_at: t, updated_at: t },
          {name: 'Chữa bệnh cho mẹ', parent_id: 3, created_at: t, updated_at: t },
          {name: 'Chuẩn bị mang thai', parent_id: 1, created_at: t, updated_at: t },
          {name: 'Trong khi mang thai', parent_id: 1, created_at: t, updated_at: t },
          {name: 'Chăm sóc bé 0-12 tháng', parent_id: 1, created_at: t, updated_at: t },
          {name: 'Nuôi dạy bé 1-3 tuổi', parent_id: 1, created_at: t, updated_at: t },
          {name: 'Nuôi dạy bé 5-13 tuổi', parent_id: 1, created_at: t, updated_at: t },
          {name: 'Mua sữa cho mẹ bầu', parent_id: 2, created_at: t, updated_at: t },
          {name: 'Mua sữa cho bé', parent_id: 2, created_at: t, updated_at: t },
          {name: 'Món ngon cho bé', parent_id: 2, created_at: t, updated_at: t },
      ];

      return queryInterface.bulkInsert('types', types);
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete('types', null);
  }
};
