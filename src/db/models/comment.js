"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Comment extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "deletedAt", "userId", "postId"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, { foreignKey: "postId" });
      this.belongsTo(models.User, { as: "user" });
    }
  }
  Comment.init(
    {
      code: DataTypes.STRING,
      details: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["user"],
        },
        user: {
          include: ["user"],
        },
      },
      hooks: {
        beforeCreate: async (comment, options) => {
          if (comment && options) {
            const { post, user } = options;

            if (user) comment.setDataValue("userId", user.id);

            if (post) {
              const _post = await sequelize.models.Post.findOne({
                where: { code: post },
              });

              if (_post) comment.setDataValue("postId", _post.id);
            }
          }
          return comment;
        },
      },
    }
  );
  return Comment;
};
