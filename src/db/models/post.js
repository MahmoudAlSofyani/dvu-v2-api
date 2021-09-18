"use strict";
const BaseModel = require("./base");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "deletedAt", "userId"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, { as: "comments", foreignKey: "postId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.File, {
        as: "images",
        through: models.PostFile,
        foreignKey: "postId",
      });
    }
  }
  Post.init(
    {
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["images"],
        },
        images: {
          include: ["images"],
        },
      },
      hooks: {
        beforeCreate: async (post, options) => {
          if (post && options) {
            const { url } = options;

            if (url) post.setDataValue("url", url);
          }

          return post;
        },
        afterCreate: async (post, options) => {
          if (post && options) {
            const { images } = options;
            if (images && images.length > 0) {
              const _images = await sequelize.models.File.bulkCreate(
                images.map((_image) => ({
                  code: _image.filename,
                  name: _image.originalname,
                  type: _image.mimetype,
                  size: _image.size,
                }))
              );

              if (_images) await post.addImages(_images);
            }
          }
          return post;
        },
        beforeUpdate: async (post, options) => {
          if (post && options) {
            const { url, images } = options;
            let { deletedImages } = options;

            if (url) post.setDataValue("url", url);

            if (images && images.length > 0) {
              const _images = await sequelize.models.File.bulkCreate(
                images.map((_image) => ({
                  code: _image.filename,
                  name: _image.originalname,
                  type: _image.mimetype,
                  size: _image.size,
                }))
              );

              if (_images) await post.addImages(_images);
            }

            if (deletedImages) {
              if (typeof deletedImages === "string")
                deletedImages = JSON.parse(deletedImages);

              if (deletedImages.length > 0) {
                const _deletedImages = await sequelize.models.File.findAll({
                  where: {
                    code: {
                      [Op.in]: deletedImages,
                    },
                  },
                });

                if (_deletedImages) {
                  await post.removeImages(_deletedImages);
                  for (const _deletedImage of _deletedImages) {
                    deleteFile(_deletedImage.code);
                    await _deletedImage.destroy();
                  }
                }
              }
            }
          }
          return post;
        },
      },
    }
  );
  return Post;
};
