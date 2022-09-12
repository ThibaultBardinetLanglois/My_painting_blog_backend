"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistModel = void 0;
const database_config_1 = require("../config/database.config");
class ArtistModel {
    static async getAll() {
        return new Promise(async function (resolve, reject) {
            database_config_1.Database.pool.query('SELECT * FROM `artist`', function (err, results) {
                if (err) {
                    console.log("ERR =>", err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }
    static async getById(id) {
        console.log("id in model =>", id);
        return new Promise(async function (resolve, reject) {
            database_config_1.Database.pool.query('SELECT * FROM `artist` WHERE id = ?', [id], function (err, result) {
                if (err) {
                    console.log("ERR =>", err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}
exports.ArtistModel = ArtistModel;
