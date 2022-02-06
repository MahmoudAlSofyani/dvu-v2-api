"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class PlateSource extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlateSource.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PlateSource",
      paranoid: true,
      underscored: true,
    }
  );
  return PlateSource;
};
