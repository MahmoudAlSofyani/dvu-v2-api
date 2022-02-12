"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Car extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "userId",
      "carMakeId",
      "carModelId",
      "carColorId",
      "plateSourceId",
      "plateCodeId",
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.CarColor, {
        foreignKey: "carColorId",
        as: "carColor",
      });
      this.belongsTo(models.CarModel, {
        foreignKey: "carModelId",
        as: "carModel",
      });
      this.belongsTo(models.CarMake, {
        foreignKey: "carMakeId",
        as: "carMake",
      });
      this.belongsTo(models.PlateCode, {
        foreignKey: "plateCodeId",
        as: "plateCode",
      });
      this.belongsTo(models.PlateSource, {
        foreignKey: "plateSourceId",
        as: "plateSource",
      });
    }
  }
  Car.init(
    {
      uid: DataTypes.STRING,
      carMakeId: DataTypes.INTEGER,
      carModelId: DataTypes.INTEGER,
      carColorId: DataTypes.INTEGER,
      year: DataTypes.STRING,
      plateCodeId: DataTypes.INTEGER,
      plateNumber: DataTypes.STRING,
      plateSourceId: DataTypes.INTEGER,
      vinNumber: DataTypes.STRING,
      otherPlateCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
      underscored: true,
      defaultScope: {
        include: [
          "carColor",
          "carModel",
          "carMake",
          "plateCode",
          "plateSource",
        ],
      },
    }
  );
  return Car;
};
