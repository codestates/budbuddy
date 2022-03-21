"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Journal_Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      journal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Journals",
          key: "id",
        },
      },
      ext: {
        type: Sequelize.STRING,
      },
      filename: {
        type: Sequelize.STRING,
      },
      store_filename: {
        type: Sequelize.STRING,
      },
      store_path: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Journal_Images");
  },
};
