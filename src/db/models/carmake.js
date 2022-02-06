"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class CarMake extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "createdAt", "updatedAt"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.CarModel, {
        through: models.CarMakeModel,
        foreignKey: "carMakeId",
      });
      this.hasMany(models.Car, { foreignKey: "carMakeId" });
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
