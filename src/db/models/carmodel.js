"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class CarModel extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "createdAt", "updatedAt"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Car, { foreignKey: "carModelId" });
      this.belongsToMany(models.CarMake, {
        through: models.CarMakeModel,
        foreignKey: "carModelId",
      });
    }
  }
  CarModel.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CarModel",
      paranoid: true,
      underscored: true,
    }
  );
  return CarModel;
};
