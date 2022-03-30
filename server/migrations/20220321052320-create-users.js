"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // profile_image_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "images",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      social: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "normal",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("users");
  },
};
