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
      email: {
        type: DataTypes.STRING,
        validate: {
          async isUnique(value) {
            const count = await sequelize.models.User.count({
              where: { email: value },
            });

            if (count !== 0) throw new Error("Email must be unique");
          },
        },
      },
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
