"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysql2_1 = __importDefault(require("mysql2"));
const cli_color_1 = __importDefault(require("cli-color"));
class Database {
}
exports.Database = Database;
_a = Database;
Database.pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST_DEV,
    port: Number(process.env.DB_PORT) || undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});
Database.checkConnection = _a.pool.query('SELECT 1', function (err) {
    if (err) {
        console.log("ERROR : ", err);
    }
    console.log(cli_color_1.default.bgYellowBright(`Server in conected to the database ${process.env.DB_NAME} on the port ${process.env.DB_PORT}`));
});
