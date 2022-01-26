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
          mobile: "555555555",
          whats_app: "555555555",
          points: 100,
          is_active: true,
          mobile_country_code: "971",
          whatsapp_country_code: "971",
        },
        {
          id: 2,
          uid: uuidv4(),
          first_name: "Sponsor",
          last_name: "Sponsor",
          email: "sponsor@volkskreisuae.com",
          password: bcrypt.hashSync("password", 12),
          mobile: "+555555555",
          points: 100,
          is_active: true,
          mobile_country_code: "971",
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
