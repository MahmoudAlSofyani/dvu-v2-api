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
          uid: uuidv4(),
          name: "Admin",
        },
        {
          id: 2,
          uid: uuidv4(),
          name: "Member",
        },
        {
          id: 3,
          uid: uuidv4(),
          name: "Purged",
        },
        {
          id: 4,
          uid: uuidv4(),
          name: "Wolfsburg",
        },
        {
          id: 5,
          uid: uuidv4(),
          name: "Sponsor",
        },
        {
          id: 6,
          uid: uuidv4(),
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
