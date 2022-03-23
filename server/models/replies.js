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
      Replies.hasOne(models.Replies);
      Replies.belongsTo(models.Users, { foreignKey: 'user_id' });
      Replies.belongsTo(models.Journals, { foreignKey: 'journal_id' });
    }
  }
  Replies.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: DataTypes.INTEGER,
      body: DataTypes.STRING,
      journal_id: DataTypes.INTEGER,
      class: DataTypes.TINYINT,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Replies",
      underscored: true,
    },
  );
  return Replies;
};
