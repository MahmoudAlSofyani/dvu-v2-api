"use strict";
const BaseModel = require("./base");
const { Op } = require("sequelize");
const moment = require("moment");
const { deleteFile } = require("../../helpers/delete-file");
module.exports = (sequelize, DataTypes) => {
  class Event extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "fileId",
      "whatsappLink",
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        as: "members",
        through: {
          model: models.UserEvent,
          foreignKey: "eventId",
        },
      });

      this.belongsTo(models.File, { as: "poster", foreignKey: "fileId" });
    }
  }
  Event.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      meetingLocation: DataTypes.STRING,
      meetingName: DataTypes.STRING,
      meetingTime: DataTypes.DATE,
      details: DataTypes.TEXT,
      isMajor: DataTypes.BOOLEAN,
      url: DataTypes.STRING,
      isPublished: DataTypes.BOOLEAN,
      whatsappLink: DataTypes.STRING,
      deadline: DataTypes.DATE,
      isOpen: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Event",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["members", "poster"],
        },
        upcoming: {
          include: ["poster"],
          where: {
            date: {
              [Op.gte]: moment(),
            },
          },
        },
      },
      hooks: {
        afterCreate: async (event, options) => {
          if (event && options) {
            const { poster } = options;

            if (poster) {
              const _pic = await sequelize.models.File.create({
                uid: poster.filename,
                name: poster.originalname,
                type: poster.mimetype,
                size: poster.size,
              });

              if (_pic) await event.setPoster(_pic);
            }
          }
          return event;
        },
        beforeUpdate: async (event, options) => {
          if (event && options) {
            const { url, poster } = options;

            if (url) event.setDataValue("url", url);

            if (poster) {
              const _oldPicture = await event.getPoster();

              if (_oldPicture) {
                deleteFile(_oldPicture.uid);
                await _oldPicture.destroy();
              }

              const _pic = await sequelize.models.File.create({
                uid: poster.filename,
                name: poster.originalname,
                type: poster.mimetype,
                size: poster.size,
              });

              if (_pic) await event.setPoster(_pic);
            }
          }
          return event;
        },
      },
    }
  );
  return Event;
};
