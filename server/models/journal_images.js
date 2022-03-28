"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journal_Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal_Images.belongsTo(models.Journals, { foreignKey: "journal_id" });
      Journal_Images.belongsTo(models.Images, { foreignKey: "image_id" });
    }
  }
  Journal_Images.init(
    {
      journal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Journal_Images",
      underscored: true,
    },
  );
  return Journal_Images;
};
