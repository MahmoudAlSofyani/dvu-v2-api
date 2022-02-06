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
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          uid: "ADMIN",
          name: "Admin",
        },
        {
          id: 2,
          uid: "MEMBER",
          name: "Member",
        },
        {
          id: 3,
          uid: "PURGED",
          name: "Purged",
        },
        {
          id: 4,
          uid: "WOLFSBURG",
          name: "Wolfsburg",
        },
        {
          id: 5,
          uid: "SPONSOR",
          name: "Sponsor",
        },
        {
          id: 6,
          uid: "LEGACY",
          name: "Legacy Member",
        },
      ],
      {
        updateOnDuplicate: ["id"],
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
