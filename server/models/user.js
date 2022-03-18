"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "고유번호 ID",
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING(100),
        comment: "유저ID",
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(100),
        comment: "비밀번호",
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING(100),
        comment: "닉네임",
      },
      salt: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
