'use strict';

module.exports = {
    up: (queryInterface) => {
        let t = new Date();

        let users = [
            { account: 'admin', fullname: 'Admin', password:'admin@123456', address: '12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh', phone: '0789600766', email:'admin@gmail.com',facebook_account:'facebook',twitter_account:'google', role_id: 1, image_url: 'https://s3-us-west-2.amazonaws.com/babyandmom/user.png',created_at: t, updated_at: t },
            { account: 'thuongntt', fullname: 'Thuong Nguyen Thi Thu', password:'thuong@123456', address: '153 An Phu Dong 09, quan 12, Ho Chi Minh', phone: '0369615118', email:'thuongntt@imt-soft.com', role_id: 2, image_url: 'https://s3-us-west-2.amazonaws.com/babyandmom/45517268_1063269330520613_3915326555361902592_o.jpg', created_at: t, updated_at: t },
            { account: 'lamnn', fullname: 'Lam Nguyen Ngoc', password:'lam@123456', address: '55-57 Bau Cat 4, Tan Binh, Ho Chi Minh', phone: '0789600766', email:'sogoten6689@gmail.com',facebook_account:'2237850582999185', role_id: 2, image_url: 'https://s3-us-west-2.amazonaws.com/babyandmom/lamnn.jpg', created_at: t, updated_at: t },
        ];

        return queryInterface.bulkInsert('users', users);
    },

    down: (queryInterface) => {

        return queryInterface.bulkDelete('users', null);
    }
};
