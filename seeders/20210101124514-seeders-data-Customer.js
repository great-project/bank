'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Customers', [
    {
      identityNumber: 1712829220,
      fullName: "Andy Arga",
      address: "Sumedang",
      birthDate: '1991-08-12',
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      identityNumber: 171282628292,
      fullName: "Bashori Mahendra",
      address: "Padang",
      birthDate: '1993-03-26',
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
