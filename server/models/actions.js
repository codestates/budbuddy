"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actions.hasMany(models.Journal_Actions);
    }
  }
  Actions.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Actions",
      underscored: true,
    },
  );
  return Actions;
};
