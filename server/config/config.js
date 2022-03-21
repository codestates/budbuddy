require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "1111",
    database: process.env.DATABASE_NAME || "Budbuddy_dev",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "1111",
    database: process.env.DATABASE_NAME || "Budbuddy_dev",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "Budbuddy_production",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
  },
};
