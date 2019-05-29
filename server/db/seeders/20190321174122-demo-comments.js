'use strict';

module.exports = {
    up: (queryInterface) => {
        let t = new Date();

        let comments = [
            {content: 'Tuyệt vời', created_at: t,topic_id: 1, user_id: 2 },
            {content: 'Hay', created_at: t,topic_id: 2, user_id: 1 },
            {content: 'Bổ ích', created_at: t,topic_id: 1, user_id: 2 },
            {content: 'Tốt lắm', created_at: t,topic_id: 2, user_id: 2 },
        ];

        return queryInterface.bulkInsert('comments', comments);
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('comments', null);
    }
};
