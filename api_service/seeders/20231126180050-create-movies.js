'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies',
        [
            {id:"1",title:"Terminator", description:"/", price: 600, category_id:1},
            {id:"2",title:"Terminator 2", description:"/", price: 600, category_id:1}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  }
};
