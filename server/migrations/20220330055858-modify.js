"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "profile_image_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "images",
        key: "id",
      },
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("plants", "image_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "images",
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "profile_image_id");
    await queryInterface.removeColumn("plants", "image_id");
  },
};
