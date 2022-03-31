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
      Journals.hasMany(Journal_Actions);
      Journals.hasMany(Journal_Images);
      Journals.hasMany(Replies);
      Journals.belongsTo(Plants, { foreignKey: "plant_id" });
      Journals.belongsTo(Users, { foreignKey: "user_id" });
    }
  }
  Journals.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      plant_height: DataTypes.FLOAT,
      date_pick: DataTypes.DATEONLY,
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Journals",
      underscored: true,
    },
  );
  return Journals;
};
