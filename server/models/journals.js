"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Journal_Actions, Journal_Images, Plants, Users, Replies } = models;
      Journals.hasMany(Journal_Actions, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Journals.hasMany(Journal_Images, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Journals.hasMany(Replies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Journals.belongsTo(Plants, { foreignKey: "plant_id" });
      Journals.belongsTo(Users, { foreignKey: "user_id" });
    }
  }
  Journals.init(
    {
      user_id: DataTypes.INTEGER,
      plant_id: DataTypes.INTEGER,
      summary: DataTypes.STRING,
      detailbody: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Journals",
      underscored: true,
    },
  );
  return Journals;
};
