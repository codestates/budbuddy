"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      Plants.hasMany(models.Journals, { foreignKey: "plant_id", onDelete: "SET NULL" });
      Plants.belongsTo(models.Users, { foreignKey: "user_id" });
      Plants.belongsTo(models.Images, { foreignKey: "image_id" });
    }
  }
  Plants.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Plants",
      underscored: true,
      paranoid: true,
    },
  );
  return Plants;
};
