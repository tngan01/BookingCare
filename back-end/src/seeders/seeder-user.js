"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: "123456", //plain text, ajdbsllbvgu11222334 -> hash password
        firstName: "Thanh",
        lastName: "Ngan",
        address: "HCM",
        gender: 0,
        typeRole: "ROLE",
        keyRole: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
