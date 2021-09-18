"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class PostFile extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.File, { foreignKey: "fileId" });
      this.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  PostFile.init(
    {
      postId: DataTypes.INTEGER,
      fileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PostFile",
      underscored: true,
      timestamps: false,
    }
  );
  return PostFile;
};
