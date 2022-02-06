"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("car_make_models", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("car_make_models");
  },
};
