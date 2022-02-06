"use strict";
const { v4: uuidv4 } = require("uuid");

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

    await queryInterface.bulkInsert("car_colors", [
      {
        id: 1,
        uid: "BLACK",
        name: "Black",
      },
      {
        id: 2,
        uid: "BLUE",
        name: "Blue",
      },
      {
        id: 3,
        uid: "WHITE",
        name: "White",
      },
      {
        id: 4,
        uid: "GREY",
        name: "Grey",
      },
      {
        id: 5,
        uid: "SILVER",
        name: "Silver",
      },
      {
        id: 6,
        uid: "YELLOW",
        name: "Yellow",
      },
      {
        id: 7,
        uid: "RED",
        name: "Red",
      },
      {
        id: 8,
        uid: "GREEN",
        name: "Green",
      },
      {
        id: 9,
        uid: "PURPLE",
        name: "Purple",
      },
      {
        id: 10,
        uid: "BROWN",
        name: "Brown",
      },
      {
        id: 11,
        uid: "VIOLET",
        name: "Violet",
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
    await queryInterface.bulkDelete("car_colors", null, {});
  },
};
