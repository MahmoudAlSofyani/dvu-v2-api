"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class File extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "AdvertisementFile",
      "PostFile",
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasOne(models.User, { foreignKey: "fileId" });
      this.hasOne(models.Announcement, { foreignKey: "fileId" });
      this.belongsToMany(models.Advertisement, {
        through: models.AdvertisementFile,
        foreignKey: "fileId",
      });
    }
  }
  File.init(
    {
      uid: DataTypes.STRING,
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
