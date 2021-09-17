"use strict";
const BaseModel = require("./base");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "password",
      "fileId",
    ];

    static associate(models) {
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

      this.belongsTo(models.File, {
        as: "profilePicture",
        foreignKey: "fileId",
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
          include: [
            "roles",
            "cars",
            "events",
            "profilePicture",
            "advertisements",
          ],
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
        advertisements: {
          include: ["advertisements"],
        },
      },
      hooks: {
        afterCreate: async (user, options) => {
          if (user && options) {
            const { password, cars, carCodes } = options;

            if (password)
              user.setDataValue("password", bcrypt.hashSync(password, 12));

            if (cars && cars.length > 0) {
              await sequelize.models.Car.bulkCreate(
                cars.map((_car, index) => ({
                  code: carCodes[index],
                  userId: user.id,
                  ..._car,
                }))
              );
            }
          }
          return user;
        },
      },
    }
  );
  return User;
};
