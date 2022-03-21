"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Replies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Replies",
          key: "id",
        },
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      journal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Journals",
          key: "id",
        },
        allowNull: false,
      },
      class: {
        type: Sequelize.TINYINT,
      },
      order: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Replies");
  },
};
