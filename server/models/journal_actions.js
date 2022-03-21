"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journal_Actions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal_Actions.belongsTo(models.Actions, { foreignKey: "actions_id" });
      Journal_Actions.belongsTo(models.Journals, { foreignKey: "journal_id" });
    }
  }
  Journal_Actions.init(
    {
      journal_id: DataTypes.INTEGER,
      actions_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Journal_Actions",
      underscored: true,
    },
  );
  return Journal_Actions;
};
