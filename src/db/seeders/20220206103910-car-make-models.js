"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("car_make_models", [
      {
        id: 1,
        car_make_id: 1,
        car_model_id: 1,
      },
      {
        id: 2,
        car_make_id: 1,
        car_model_id: 2,
      },
      {
        id: 3,
        car_make_id: 1,
        car_model_id: 3,
      },
      {
        id: 4,
        car_make_id: 1,
        car_model_id: 4,
      },
      {
        id: 5,
        car_make_id: 1,
        car_model_id: 5,
      },
      {
        id: 6,
        car_make_id: 1,
        car_model_id: 6,
      },
      {
        id: 7,
        car_make_id: 1,
        car_model_id: 7,
      },
      {
        id: 8,
        car_make_id: 1,
        car_model_id: 8,
      },
      {
        id: 9,
        car_make_id: 1,
        car_model_id: 9,
      },
      {
        id: 10,
        car_make_id: 1,
        car_model_id: 10,
      },
      {
        id: 11,
        car_make_id: 1,
        car_model_id: 11,
      },
      {
        id: 12,
        car_make_id: 1,
        car_model_id: 12,
      },
      {
        id: 13,
        car_make_id: 1,
        car_model_id: 13,
      },
      {
        id: 14,
        car_make_id: 1,
        car_model_id: 14,
      },
      {
        id: 15,
        car_make_id: 1,
        car_model_id: 15,
      },
      {
        id: 16,
        car_make_id: 1,
        car_model_id: 16,
      },
      {
        id: 17,
        car_make_id: 1,
        car_model_id: 17,
      },
      {
        id: 18,
        car_make_id: 1,
        car_model_id: 18,
      },
      {
        id: 19,
        car_make_id: 1,
        car_model_id: 19,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("car_make_models", null, {});
  },
};
