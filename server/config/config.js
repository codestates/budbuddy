require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "Budbuddy_dev",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리
    timezone: "+09:00", // 타임존을 설정
  },
  test: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "Budbuddy_test",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리
    timezone: "+09:00", // 타임존을 설정
  },
  production: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "Budbuddy",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리
    timezone: "+09:00", // 타임존을 설정
  },
};
