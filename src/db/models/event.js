"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Event extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: {
          model: models.UserEvent,
          foreignKey: "eventId",
        },
      });
    }
  }
  Event.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      meetingPoint: DataTypes.GEOMETRY,
      meetingDate: DataTypes.DATE,
      details: DataTypes.TEXT,
      isMajor: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Event",
      paranoid: true,
      underscored: true,
    }
  );
  return Event;
};
