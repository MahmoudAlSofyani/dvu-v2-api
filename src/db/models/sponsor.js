"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Sponsor extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.File, {
        as: "logo",
      });
    }
  }
  Sponsor.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sponsor",
      paranoid: true,
      underscored: true,
    }
  );
  return Sponsor;
};
