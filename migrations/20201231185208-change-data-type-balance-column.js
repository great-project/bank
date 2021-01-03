'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: 'REAL USING CAST("balance" as REAL)'
});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: 'VARCHAR USING CAST("balance" as VARCHAR)'
    })
  }
};
