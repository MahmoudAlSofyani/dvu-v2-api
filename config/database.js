require("dotenv-safe").config({ allowEmptyValues: true });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      undescored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: "mysql",
    logging: false,
    define: {
      undescored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
  },
  production: {
    database: process.env.DB_NAME,
    dialect: "mysql",
    logging: false,
    define: {
      undescored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
    replication: {
      read: [
        {
          host: process.env.DB_HOST_1R,
          username: process.env.DB_USERNAME_1R,
          password: process.env.DB_PASSWORD_1R,
        },
        {
          host: process.env.DB_HOST_2R,
          username: process.env.DB_USERNAME_2R,
          password: process.env.DB_PASSWORD_2R,
        },
      ],
      write: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      },
    },
    pool: {
      max: 20,
      acquire: 30000,
      idle: 10000,
    },
  },
};
