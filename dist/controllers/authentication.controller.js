"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const utils_utils_1 = require("../utils/utils.utils");
const authentication_model_1 = require("../models/authentication.model");
const user_model_1 = require("../models/user.model");
class AuthenticationController {
}
exports.AuthenticationController = AuthenticationController;
_a = AuthenticationController;
AuthenticationController.register = async (req, res) => {
    await authentication_model_1.AuthenticationModel.register(req.body)
        .then(async (response) => {
        const lastInsertId = { ...response }.insertId;
        await user_model_1.UserModel.getById(lastInsertId)
            .then((lastInsertedUser) => {
            let userPayload = { ...lastInsertedUser }["0"];
            delete userPayload.hashed_password;
            const token = utils_utils_1.Utils.generateToken(userPayload);
            return res.status(201).json({
                message: `L'utilisateur ${req.body.username} a bien été créé`,
                user: userPayload,
                token: token,
            });
        });
    })
        .catch(err => {
        console.log("ERROR =>", err);
        res.status(400).json({
            message: `Erreur lors de l'enregistrement de ${req.body.username}`
        });
    });
};
AuthenticationController.login = async (req, res) => {
    console.log("controller login =>", req.body);
    const token = utils_utils_1.Utils.generateToken(req.body);
    return res.status(201).json({
        message: `Vous êtes désormais connecté`,
        user: req.body,
        token: token,
    });
};
