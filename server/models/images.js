"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Images.belongsTo(models.Users, { foreignKey: "user_id", onDelete: "CASCADE" });
      Images.hasOne(models.Journal_Images, { onDelete: "CASCADE" });
      Images.hasOne(models.Users, { foreignKey: "profile_image_id" });
      Images.hasOne(models.Plants, { foreignKey: "image_id" });
    }
  }
  Images.init(
    {
      user_id: {
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
      modelName: "Images",
      underscored: true,
    },
  );
  return Images;
};
