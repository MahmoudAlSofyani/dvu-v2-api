"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Announcement extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Announcement.init(
    {
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      details: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Announcement",
      paranoid: true,
      underscored: true,
    }
  );
  return Announcement;
};
