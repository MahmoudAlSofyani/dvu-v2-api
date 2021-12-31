"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("advertisement_files", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      advertisement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "advertisements",
          key: "id",
        },
      },
      file_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "files",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("advertisement_files");
  },
};
