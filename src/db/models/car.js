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
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
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
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
      underscored: true,
    }
  );
  return Car;
};
