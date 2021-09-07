"use strict";
const BaseModel = require("./base");
const bcrypt = require("bcrypt");
const { Op, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "password",
    ];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Car, { as: "cars", foreignKey: "userId" });
      this.belongsToMany(models.Role, {
        as: "roles",
        through: {
          model: models.UserRole,
          foreignKey: "userId",
        },
      });

      this.belongsToMany(models.Event, {
        as: "events",
        through: {
          model: models.UserEvent,
          foreignKey: "userId",
        },
      });

      this.hasOne(models.File, { as: "profilePicture", foreignKey: "id" });

      this.hasMany(models.Advertisement, {
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
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["roles", "cars", "events", "profilePicture"],
        },
        roles: {
          include: ["roles"],
        },
        cars: {
          include: ["cars"],
        },
        events: {
          include: ["events"],
        },
        profilePicture: {
          include: ["profilePicture"],
        },
      },
      hooks: {
        beforeCreate: async (user, options) => {
          if (user && options) {
            const { code, password } = options;

            if (code) user.setDataValue("code", code);
            if (password)
              user.setDataValue("password", bcrypt.hashSync(password, 12));
          }
          return user;
        },
      },
    }
  );
  return User;
};
