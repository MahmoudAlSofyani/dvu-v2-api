"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserEvent.init(
    {
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      isAttended: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserEvent",
      paranoid: true,
      underscored: true,
    }
  );
  return UserEvent;
};
