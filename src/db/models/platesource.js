"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class PlateSource extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "createdAt",
      "updatedAt",
      "PlatCodePlateSource",
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Car);
      this.belongsToMany(models.PlateCode, {
        through: models.PlateCodePlateSource,
        foreignKey: "plateSourceId",
      });
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
      defaultScope: {
        order: [["name", "ASC"]],
      },
    }
  );
  return PlateSource;
};
