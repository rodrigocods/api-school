import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { mainConfig } from "../ormconfig";

export const AppDataSource = new DataSource(<DataSourceOptions> mainConfig);