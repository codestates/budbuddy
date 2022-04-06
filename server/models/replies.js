"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Replies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Replies.belongsTo(models.Users, { foreignKey: "user_id", onDelete: "CASCADE" });
      Replies.belongsTo(models.Journals, { foreignKey: "journal_id", onDelete: "CASCADE" });
      Replies.hasMany(Replies, { foreignKey: "group_id", onDelete: "CASCADE" });
    }
  }
  Replies.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: DataTypes.STRING,
      journal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      class: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Replies",
      underscored: true,
    },
  );
  return Replies;
};
