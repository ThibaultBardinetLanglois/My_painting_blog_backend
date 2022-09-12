"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModel = void 0;
const database_config_1 = require("../config/database.config");
class AuthenticationModel {
    static async register(user) {
        return new Promise(async function (resolve, reject) {
            database_config_1.Database.pool.query('INSERT INTO user (username, email, hashed_password, role) VALUES (?, ?, ?, "user")', [user.username, user.email, user.hashedPassword], function (err, result) {
                if (err) {
                    console.log("ERR =>", err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}
exports.AuthenticationModel = AuthenticationModel;
