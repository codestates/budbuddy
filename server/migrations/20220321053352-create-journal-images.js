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
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      journal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "journals",
          key: "id",
        },
        allowNull: false,
      },
      ext: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      store_filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      store_path: {
        type: Sequelize.STRING,
        allowNull: false,
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
