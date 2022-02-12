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

    await queryInterface.bulkInsert("plate_sources", [
      {
        id: 1,
        uid: "ABUDHABI",
        name: "Abu Dhabi",
      },
      {
        id: 2,
        uid: "DUBAI",
        name: "Dubai",
      },
      {
        id: 3,
        uid: "SHARJAH",
        name: "Sharjah",
      },
      {
        id: 4,
        uid: "AJMAN",
        name: "Ajman",
      },
      {
        id: 5,
        uid: "UMALQUWAIN",
        name: "Um Al Quwain",
      },
      {
        id: 6,
        uid: "RASALKHAIMAH",
        name: "Ras Al Khaimah",
      },
      {
        id: 7,
        uid: "FUJAIRAH",
        name: "Fujairah",
      },
      {
        id: 8,
        uid: "SAUDIARABIA",
        name: "Saudi Arabia",
      },
      {
        id: 9,
        uid: "OMAN",
        name: "Oman",
      },
      {
        id: 10,
        uid: "KUWAIT",
        name: "Kuwait",
      },
      {
        id: 11,
        uid: "BAHRAIN",
        name: "Bahrain",
      },
      {
        id: 12,
        uid: "QATAR",
        name: "Qatar",
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
    await queryInterface.bulkDelete("plate_sources", null, {});
  },
};
