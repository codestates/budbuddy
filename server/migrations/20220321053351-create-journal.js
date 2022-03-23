"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("journals", {
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
      plant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "plants",
          key: "id",
        },
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING,
      },
      detail_body: {
        type: Sequelize.STRING,
      },
      public: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("journals");
  },
};
