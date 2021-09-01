"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Car, { as: "cars", foreignKey: "userId" });
      this.belongsToMany(models.Role, {
        through: {
          model: models.UserRole,
          foreignKey: "userId",
          as: "roles",
        },
      });

      this.belongsToMany(models.Event, {
        through: {
          model: models.UserEvent,
          foreignKey: "userId",
          as: "events",
        },
      });

      this.hasOne(models.File, {
        as: "profilePicture",
      });

      this.hasMany(models.Advertisment, {
        as: "advertisements",
        foreignKey: "userId",
      });

      this.hasMany(models.Comment, { foreignKey: "userId" });
      this.hasMany(models.Post, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      code: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.STRING,
      whatsApp: DataTypes.STRING,
      points: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      fileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      underscored: true,
    }
  );
  return User;
};
