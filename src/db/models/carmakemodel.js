"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class CarMakeModel extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarMakeModel.init(
    {
      carMakeId: DataTypes.INTEGER,
      carModelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CarMakeModel",
      underscored: true,
      timestamps: false,
    }
  );
  return CarMakeModel;
};
