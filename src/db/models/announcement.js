"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Announcement extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "deletedAt", "fileId"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.File, { as: "poster", foreignKey: "fileId" });
    }
  }
  Announcement.init(
    {
      uid: DataTypes.STRING,
      title: DataTypes.STRING,
      details: DataTypes.TEXT,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Announcement",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["poster"],
        },
        poster: {
          include: ["poster"],
        },
      },
      hooks: {
        beforeCreate: async (announcement, options) => {
          if (announcement && options) {
            const { logo, url } = options;

            if (url) announcement.setDataValue("url", url);

            if (logo) {
              const _poster = await sequelize.models.File.create({
                uid: logo.filename,
                name: logo.originalname,
                type: logo.mimetype,
                size: logo.size,
              });

              if (_poster) announcement.setDataValue("fileId", _poster.id);
            }
          }
          return announcement;
        },
        beforeUpdate: async (announcement, options) => {
          if (announcement && options) {
            const { poster, url } = options;

            if (url) announcement.setDataValue("url", url);

            if (poster) {
              const _oldPoster = await announcement.getPoster();

              deleteFile(_oldPoster.uid);
              await _oldPoster.destroy();

              const _newPoster = await sequelize.models.File.create({
                uid: poster.filename,
                name: poster.originalname,
                type: poster.mimetype,
                size: poster.size,
              });

              if (_newPoster)
                announcement.setDataValue("fileId", _newPoster.id);
            }
          }
          return announcement;
        },
      },
    }
  );
  return Announcement;
};
