"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Advertisement.init(
    {
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
      isSold: DataTypes.BOOLEAN,
      urlSlug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Advertisement",
      paranoid: true,
      underscored: true,
    }
  );
  return Advertisement;
};
