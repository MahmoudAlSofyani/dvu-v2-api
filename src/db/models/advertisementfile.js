"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class AdvertisementFile extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.File, { foreignKey: "fileId" });
      this.belongsTo(models.Advertisement, { foreignKey: "advertisementId" });
    }
  }
  AdvertisementFile.init(
    {
      advertisementId: DataTypes.INTEGER,
      fileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AdvertisementFile",
      underscored: true,
      timestamps: false,
    }
  );
  return AdvertisementFile;
};
