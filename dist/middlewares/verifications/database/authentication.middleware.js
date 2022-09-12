"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationDBVerifications = void 0;
const user_model_1 = require("../../../models/user.model");
class AuthenticationDBVerifications {
    static findUserInDbByUsername(req, res, next) {
        const { username } = req.body;
        user_model_1.UserModel.getByUsername(username)
            .then(user => {
            console.log("USER in DB =>", user);
            if (user && user.length > 0) {
                req.body.userFoudIndDB = user[0];
            }
            next();
        })
            .catch(err => {
            console.log("Error in mdw : ", err);
            res.status(500).json({
                message: `Erreur lors de la vérification de l'existence du nom ${req.body.username} dans la base de données`
            });
        });
    }
    static dontAuthorizeDuplicateUsername(req, res, next) {
        if (req.body.userFoudIndDB) {
            return res.status(422).json({ message: "Ce nom est déjà utilisé par un autre utilisateur" });
        }
        next();
    }
    static checkIfUserExistForLogin(req, res, next) {
        if (!req.body.userFoudIndDB) {
            return res.status(422).json({ message: "Cet utilisateur n'existe pas en base de données" });
        }
        next();
    }
}
exports.AuthenticationDBVerifications = AuthenticationDBVerifications;
