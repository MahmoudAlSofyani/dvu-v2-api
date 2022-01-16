"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Event extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "createdAt", "updatedAt", "deletedAt"];
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
    }
  }
  Event.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      meetingLocation: {
        type: DataTypes.GEOMETRY,
        get() {
          const rawValue = this.getDataValue("meetingLocation");
          return rawValue ? rawValue.coordinates : null;
        },
      },
      meetingName: DataTypes.STRING,
      meetingTime: DataTypes.DATE,
      details: DataTypes.TEXT,
      isMajor: DataTypes.BOOLEAN,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["members"],
        },
      },
      hooks: {
        beforeCreate: async (event, options) => {
          if (event && options) {
            event.setDataValue("meetingLocation", {
              type: "Point",
              coordinates: event.getDataValue("meetingLocation"),
            });
          }
        },
      },
    }
  );
  return Event;
};
