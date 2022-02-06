"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class PlateCodePlateSource extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlateCodePlateSource.init(
    {
      plateCodeId: DataTypes.INTEGER,
      plateSourceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlateCodePlateSource",
      underscored: true,
      timestamps: false,
    }
  );
  return PlateCodePlateSource;
};
