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
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      underscored: true,
    },
  );
  return Users;
};
