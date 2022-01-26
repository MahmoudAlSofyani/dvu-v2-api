"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("users", "mobile_country_code", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("users", "whatsapp_country_code", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("users", "mobile_country_code");
    await queryInterface.removeColumn("users", "whatsapp_country_code");
  },
};
