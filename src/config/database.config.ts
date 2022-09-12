import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';
import clc from "cli-color";

export class Database {
  static pool = mysql.createPool({
    host: process.env.DB_HOST_DEV, // address of the server
    port: Number(process.env.DB_PORT) || undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
  });

  static checkConnection = this.pool.query(
    'SELECT 1',
    function(err) {
      if (err) {
        console.log("ERROR : ", err);
        
      } 
      console.log(clc.bgYellowBright(`Server in conected to the database ${process.env.DB_NAME} on the port ${process.env.DB_PORT}`));
    }
  );
}
