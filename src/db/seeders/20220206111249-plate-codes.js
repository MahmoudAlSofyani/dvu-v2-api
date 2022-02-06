"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     * uid: uuidv4(),
     *   name: 'John Doe',
     *
     *
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("plate_codes", [
      {
        id: 1,
        uid: "RED1",
        name: "Red 1",
      },
      {
        id: 2,
        uid: "RED2",
        name: "Red 2",
      },
      {
        id: 3,
        uid: "RED4",
        name: "Red 4",
      },
      {
        id: 4,
        uid: "RED5",
        name: "Red 5",
      },
      {
        id: 5,
        uid: "RED6",
        name: "Red 6",
      },
      {
        id: 6,
        uid: "RED7",
        name: "Red 7",
      },
      {
        id: 8,
        uid: "RED8",
        name: "Red 8",
      },
      {
        id: 9,
        uid: "RED9",
        name: "Red 9",
      },
      {
        id: 10,
        uid: "RED10",
        name: "Red 10",
      },
      {
        id: 11,
        uid: "RED11",
        name: "Red 11",
      },
      {
        id: 12,
        uid: "RED12",
        name: "Red 12",
      },
      {
        id: 13,
        uid: "RED13",
        name: "Red 13",
      },
      {
        id: 14,
        uid: "RED14",
        name: "Red 14",
      },
      {
        id: 15,
        uid: "RED15",
        name: "Red 15",
      },
      {
        id: 16,
        uid: "RED16",
        name: "Red 16",
      },
      {
        id: 17,
        uid: "RED17",
        name: "Red 17",
      },
      {
        id: 18,
        uid: "RED18",
        name: "Red 50",
      },
      {
        id: 19,
        uid: "A19",
        name: "A",
      },
      {
        id: 20,
        uid: "B20",
        name: "B",
      },
      {
        id: 21,
        uid: "C21",
        name: "C",
      },
      {
        id: 22,
        uid: "D22",
        name: "D",
      },
      {
        id: 23,
        uid: "E23",
        name: "E",
      },
      {
        id: 24,
        uid: "F24",
        name: "F",
      },
      {
        id: 25,
        uid: "G25",
        name: "G",
      },
      {
        id: 26,
        uid: "H26",
        name: "H",
      },
      {
        id: 27,
        uid: "I27",
        name: "I",
      },
      {
        id: 28,
        uid: "J28",
        name: "J",
      },
      {
        id: 29,
        uid: "K29",
        name: "K",
      },
      {
        id: 30,
        uid: "L30",
        name: "L",
      },
      {
        id: 31,
        uid: "M31",
        name: "M",
      },
      {
        id: 32,
        uid: "N32",
        name: "N",
      },
      {
        id: 33,
        uid: "O33",
        name: "O",
      },
      {
        id: 34,
        uid: "P34",
        name: "P",
      },
      {
        id: 35,
        uid: "Q35",
        name: "Q",
      },
      {
        id: 36,
        uid: "R36",
        name: "R",
      },
      {
        id: 37,
        uid: "S37",
        name: "S",
      },
      {
        id: 38,
        uid: "T38",
        name: "T",
      },
      {
        id: 39,
        uid: "U39",
        name: "U",
      },
      {
        id: 40,
        uid: "V40",
        name: "V",
      },
      {
        id: 41,
        uid: "W41",
        name: "W",
      },
      {
        id: 42,
        uid: "X42",
        name: "X",
      },
      {
        id: 43,
        uid: "Y43",
        name: "Y",
      },
      {
        id: 44,
        uid: "Z44",
        name: "Z",
      },
      {
        id: 45,
        uid: "WHITE45",
        name: "White",
      },
      {
        id: 46,
        uid: "SHJ1",
        name: "1",
      },
      {
        id: 47,
        uid: "SHJ2",
        name: "2",
      },
      {
        id: 48,
        uid: "SHJ3",
        name: "3",
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
  },
};
