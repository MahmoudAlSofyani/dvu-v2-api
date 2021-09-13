"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class File extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasOne(models.User, { foreignKey: "fileId" });
      // this.belongsTo(models.Sponsor);
    }
  }
  File.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      size: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "File",
      paranoid: true,
      underscored: true,
    }
  );
  return File;
};
