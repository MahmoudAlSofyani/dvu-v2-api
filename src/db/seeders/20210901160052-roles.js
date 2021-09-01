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
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          code: "ADMIN",
          name: "Admin",
        },
        {
          id: 2,
          code: "MEMBER",
          name: "Member",
        },
        {
          id: 3,
          code: "PURGED",
          name: "Purged",
        },
        {
          id: 4,
          code: "WOLFSBURG",
          name: "Wolfsburg",
        },
        {
          id: 5,
          code: "SPONSOR",
          name: "Sponsor",
        },
        {
          id: 6,
          code: "LEGACY",
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
