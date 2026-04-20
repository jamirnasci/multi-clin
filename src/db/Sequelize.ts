import {Sequelize} from "sequelize";
import mysql from 'mysql2'
import 'server-only'

export const sequelize = new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectModule: mysql
    });