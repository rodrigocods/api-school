import { DatabaseType } from "typeorm";

export const mainConfig = {
  type: <DatabaseType> process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: (process.env.DB_SYNCHRONIZE === "true" ? true : false),
  logging: (process.env.DB_LOGGING === "true" ? true : false ),
  entities: ['/src/api/components/**/model.js'],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [],
};