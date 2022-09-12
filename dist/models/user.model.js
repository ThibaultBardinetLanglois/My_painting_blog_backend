"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_config_1 = require("../config/database.config");
class UserModel {
    static async getAll() {
        return new Promise(async function (resolve, reject) {
            database_config_1.Database.pool.query('SELECT id, username, email, role FROM `user`', function (err, results) {
                if (err) {
                    console.log("ERR =>", err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }
    static async getById(id) {
        return new Promise(async function (resolve, reject) {
            database_config_1.Database.pool.query('SELECT * FROM `user` WHERE id = ?', [id], function (err, result) {
                if (err) {
                    console.log("ERR =>", err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    static async getByUsername(username) {
        return new Promise(async function (resolve, reject) {
            database_config_1.Database.pool.query('SELECT * FROM `user` WHERE username = ?', [username], function (err, result) {
                if (err) {
                    console.log("ERR =>", err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}
exports.UserModel = UserModel;
