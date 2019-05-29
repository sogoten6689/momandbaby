'use strict';

module.exports = {
    up: (queryInterface) => {
        let t = new Date();

        let actions = [
            {action: 'LIKE', created_at: t, topic_id: 1, user_id: 2  },
            {action: 'LIKE', created_at: t, topic_id: 1, user_id: 1  },
            {action: 'DISLIKE', created_at: t, topic_id: 2, user_id: 2  },
        ];

        return queryInterface.bulkInsert('user-topic-action', actions);
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('user-topic-action', null);
    }
};
