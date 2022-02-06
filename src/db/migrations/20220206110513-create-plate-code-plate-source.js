"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plate_code_plate_sources", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate_code_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "plate_codes",
          key: "id",
        },
      },
      plate_source_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "plate_sources",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plate_code_plate_sources");
  },
};
