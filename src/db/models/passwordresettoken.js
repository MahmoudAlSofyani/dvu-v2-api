"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class PasswordResetToken extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User, { as: "resetToken", foreignKey: "userId" });
    }
  }
  PasswordResetToken.init(
    {
      uid: DataTypes.STRING,
      token: DataTypes.STRING,
      tokenExpiry: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PasswordResetToken",
      paranoid: true,
      underscored: true,
    }
  );
  return PasswordResetToken;
};
