"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("journal_images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      journal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "journals",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "images",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("journal_images");
  },
};
