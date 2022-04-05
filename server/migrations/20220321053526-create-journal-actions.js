"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("journal_actions", {
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
      action_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "actions",
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
    await queryInterface.dropTable("journal_actions");
  },
};
