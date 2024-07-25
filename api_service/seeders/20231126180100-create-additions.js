'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('additions',
        [
          {id:"1",title:"3D"},
          {id:"2",title:"4K"}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('additions', null, {});
  }
};
