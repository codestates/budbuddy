"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Journal_actions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      journal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Journals",
          key: "id",
        },
        allowNull: false,
      },
      actions_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Actions",
          key: "id",
        },
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
    await queryInterface.dropTable("Journal_actions");
  },
};
