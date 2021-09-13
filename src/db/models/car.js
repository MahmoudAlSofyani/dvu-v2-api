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
      code: DataTypes.STRING,
      model: DataTypes.STRING,
      color: DataTypes.STRING,
      year: DataTypes.STRING,
      plateCode: DataTypes.STRING,
      plateNumber: DataTypes.STRING,
      plateSource: DataTypes.STRING,
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
