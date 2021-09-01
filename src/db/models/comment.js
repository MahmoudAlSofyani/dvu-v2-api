"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Comment extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(model.Post);
      this.belongsTo(model.User);
    }
  }
  Comment.init(
    {
      code: DataTypes.STRING,
      details: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
      paranoid: true,
      underscored: true,
    }
  );
  return Comment;
};
