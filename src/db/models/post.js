"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Post extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, { as: "comments", foreignKey: "postId" });
      this.belongsTo(models.User);
    }
  }
  Post.init(
    {
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      urlSlug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      paranoid: true,
      underscored: true,
    }
  );
  return Post;
};
