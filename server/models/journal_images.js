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
      Journal_Images.belongsTo(models.Users, { foreignKey: "user_id" });
      Journal_Images.belongsTo(models.Journals, { foreignKey: "journal_id" });
    }
  }
  Journal_Images.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      journal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ext: DataTypes.STRING,
      filename: DataTypes.STRING,
      store_filename: DataTypes.STRING,
      store_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Journal_Images",
      underscored: true,
    },
  );
  return Journal_Images;
};
