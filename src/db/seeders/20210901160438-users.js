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
      "users",
      [
        {
          id: 1,
          code: "SUPERADMIN",
          first_name: "Super",
          last_name: "Admin",
          email: "admin@volkskreisuae.com",
          password: "",
          mobile: "+971555555555",
          whats_app: "+971555555555",
          points: 100,
          is_active: true,
        },
        {
          id: 2,
          code: "SPONSOR",
          first_name: "Sponsor",
          last_name: "Sponsor",
          email: "sponsor@volkskreisuae.com",
          password: "",
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
