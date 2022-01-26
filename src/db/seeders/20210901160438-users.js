"use strict";
const bcrypt = require("bcrypt");
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
      "users",
      [
        {
          id: 1,
          uid: uuidv4(),
          first_name: "Super",
          last_name: "Admin",
          email: "admin@volkskreisuae.com",
          password: bcrypt.hashSync("password", 12),
          mobile: "+971555555555",
          whats_app: "+971555555555",
          points: 100,
          is_active: true,
        },
        {
          id: 2,
          uid: uuidv4(),
          first_name: "Sponsor",
          last_name: "Sponsor",
          email: "sponsor@volkskreisuae.com",
          password: bcrypt.hashSync("password", 12),
          mobile: "+971555555555",
          whats_app: "+971555555555",
          points: 100,
          is_active: true,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
