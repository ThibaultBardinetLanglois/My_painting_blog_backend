"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("../models/user.model");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.getAll = async (req, res) => {
    await user_model_1.UserModel.getAll()
        .then(users => {
        return res.status(200).send(users);
    })
        .catch(err => {
        console.log("Erreur pour obtenir tous les utilisateurs en base de données, ", err);
        return res.status(500).json({
            message: "Erreur pour obtenir tous les utilisateurs en base de données"
        });
    });
};
