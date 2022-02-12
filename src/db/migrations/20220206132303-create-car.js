"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: uuidv4(),
      },
      car_make_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_makes",
          key: "id",
        },
      },
      car_model_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_models",
          key: "id",
        },
      },
      car_color_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_colors",
          key: "id",
        },
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plate_code_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "plate_codes",
          key: "id",
        },
      },
      plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plate_source_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "plate_sources",
          key: "id",
        },
      },
      vin_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: { allowNull: true, type: Sequelize.DATE },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cars");
  },
};
