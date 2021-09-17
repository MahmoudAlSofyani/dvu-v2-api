"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "userId",
      "eventId",
      "createdAt",
      "EventId",
      "UserId",
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Event, { foreignKey: "eventId" });
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
      timestamps: false,
    }
  );
  return UserEvent;
};
