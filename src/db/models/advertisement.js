"use strict";
const BaseModel = require("./base");
const { Op } = require("sequelize");
const { deleteFile } = require("../../helpers/delete-file");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends BaseModel {
    PROTECTED_ATTRIBUTES = ["userId", "id"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "user", foreignKey: "userId" });
      this.belongsToMany(models.File, {
        as: "images",
        through: models.AdvertisementFile,
        foreignKey: "advertisementId",
      });
    }
  }
  Advertisement.init(
    {
      uid: DataTypes.STRING,
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
      isSold: DataTypes.BOOLEAN,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Advertisement",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: [
            "images",
            {
              association: "user",
              attributes: ["uid", "firstName", "lastName"],
            },
          ],
        },
        images: {
          include: ["images"],
        },
      },
      hooks: {
        beforeCreate: async (advertisement, options) => {
          if (advertisement && options) {
            const { url } = options;

            if (url) advertisement.setDataValue("url", url);
          }

          return advertisement;
        },
        afterCreate: async (advertisement, options) => {
          if (advertisement && options) {
            const { images } = options;
            if (images && images.length > 0) {
              const _images = await sequelize.models.File.bulkCreate(
                images.map((_image) => ({
                  uid: _image.filename,
                  name: _image.originalname,
                  type: _image.mimetype,
                  size: _image.size,
                }))
              );

              if (_images) await advertisement.addImages(_images);
            }
          }
          return advertisement;
        },
        beforeUpdate: async (advertisement, options) => {
          if (advertisement && options) {
            const { url, images } = options;
            let { deletedImages } = options;

            if (url) advertisement.setDataValue("url", url);

            if (images && images.length > 0) {
              const _images = await sequelize.models.File.bulkCreate(
                images.map((_image) => ({
                  uid: _image.filename,
                  name: _image.originalname,
                  type: _image.mimetype,
                  size: _image.size,
                }))
              );

              if (_images) await advertisement.addImages(_images);
            }

            if (deletedImages) {
              if (typeof deletedImages === "string")
                deletedImages = JSON.parse(deletedImages);

              if (deletedImages.length > 0) {
                const _deletedImages = await sequelize.models.File.findAll({
                  where: {
                    uid: {
                      [Op.in]: deletedImages,
                    },
                  },
                });

                if (_deletedImages) {
                  await advertisement.removeImages(_deletedImages);
                  for (const _deletedImage of _deletedImages) {
                    deleteFile(_deletedImage.uid);
                    await _deletedImage.destroy();
                  }
                }
              }
            }
          }
          return advertisement;
        },
      },
    }
  );
  return Advertisement;
};
