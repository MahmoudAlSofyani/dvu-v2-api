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

    await queryInterface.bulkInsert("car_models", [
      {
        id: 1,
        uid: "GOLFGTI",
        name: "Golf GTI",
      },
      {
        id: 2,
        uid: "GOLFTSI",
        name: "Golf TSI",
      },
      {
        id: 3,
        uid: "GOLFGTICLUBSPORT",
        name: "Golf GTI Clubsport",
      },
      {
        id: 4,
        uid: "GOLFR",
        name: "Golf R",
      },
      {
        id: 5,
        uid: "GOLFR32",
        name: "Golf R32",
      },
      {
        id: 6,
        uid: "SCIROCCO",
        name: "Scirocco",
      },
      {
        id: 7,
        uid: "SCIROCCOR",
        name: "Scirocco R",
      },
      {
        id: 8,
        uid: "TOUAREG",
        name: "Touareg",
      },
      {
        id: 9,
        uid: "TIGUAN",
        name: "Tiguan",
      },
      {
        id: 10,
        uid: "TIGUANRLINE",
        name: "Tiguan R Line",
      },
      {
        id: 11,
        uid: "PASSAT",
        name: "Passat",
      },
      {
        id: 12,
        uid: "PASSATR36",
        name: "Passat R36",
      },
      {
        id: 13,
        uid: "ARTEON",
        name: "Arteon",
      },
      {
        id: 14,
        uid: "ARTEONRLINE",
        name: "Arteon R Line",
      },
      {
        id: 15,
        uid: "EOS",
        name: "EOS",
      },
      {
        id: 16,
        uid: "CC",
        name: "CC",
      },
      {
        id: 17,
        uid: "BEETLE",
        name: "Beetle",
      },
      {
        id: 18,
        uid: "JETTA",
        name: "Jetta",
      },
      {
        id: 19,
        uid: "TERAMONT",
        name: "Termamont",
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
    await queryInterface.bulkDelete("car_models", null, {});
  },
};
