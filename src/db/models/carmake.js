"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class CarMake extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarMake.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CarMake",
      paranoid: true,
      underscored: true,
    }
  );
  return CarMake;
};
