import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();
const sequelize=new Sequelize(process.env.POSTGRES_CONN_STRING);
export default sequelize;