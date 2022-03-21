"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Replies, Plants, Journal_Images, Journals } = models;
      Users.hasMany(Replies);
      Users.hasMany(Plants);
      Users.hasMany(Journal_Images);
      Users.hasMany(Journals);
    }
  }
  Users.init(
    {
      profile_image: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      underscored: true,
    },
  );
  return Users;
};
