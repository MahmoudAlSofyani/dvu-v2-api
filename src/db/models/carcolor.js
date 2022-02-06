"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class CarColor extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarColor.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CarColor",
      paranoid: true,
      underscored: true,
    }
  );
  return CarColor;
};
