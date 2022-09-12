"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRequestVerifications = void 0;
const regex_utils_1 = require("../../../utils/regex.utils");
/* Request to check incomming request content to register a user correctly */
class AuthenticationRequestVerifications {
    static verifyPresenceOfFieldsForRegister(req, res, next) {
        if (Object.keys(req.body).length !== 3) {
            return res.status(400).json({
                message: "La requête ne contient pas les bonnes informations"
            });
        }
        next();
    }
    static verifyPresenceOfFieldsForLogin(req, res, next) {
        if (Object.keys(req.body).length !== 2) {
            return res.status(400).json({
                message: "La requête ne contient pas les bonnes informations"
            });
        }
        next();
    }
    static verifyUsernamePresence(req, res, next) {
        const { username } = req.body;
        if (!username ||
            typeof username !== "string" ||
            username.length === 0) {
            return res.status(422).json({
                message: "Le nom donnée n'est pas du bon type et/ou n'est pas présent"
            });
        }
        next();
    }
    static verifyEmailPresence(req, res, next) {
        const { email } = req.body;
        if (!email ||
            typeof email !== "string" ||
            email.length === 0) {
            return res.status(422).json({
                message: "L'email' donnée n'est pas du bon type et/ou n'est pas présent"
            });
        }
        next();
    }
    static verifyEmailSyntax(req, res, next) {
        const { email } = req.body;
        if (!regex_utils_1.RegexChecking.verifyEmailSyntax(email)) {
            return res.status(422).json({
                message: "L'email donné n'a pas la bonne syntaxe"
            });
        }
        next();
    }
    static verifyPasswordPresence(req, res, next) {
        const { password } = req.body;
        if (!password ||
            typeof password !== "string" ||
            password.length === 0) {
            return res.status(422).json({
                message: "Le mot de passe n'est pas du bon type et/ou n'est pas présent"
            });
        }
        next();
    }
    static verifyPasswordSyntax(req, res, next) {
        const { password } = req.body;
        if (!regex_utils_1.RegexChecking.verifyPasswordSyntax(password)) {
            return res.status(422).json({
                message: "Le mot de passe n'a pas la bonne syntaxe, il doit contenir au moins 8 lettres dont au moins 1 majuscule, une minuscule, un chiffre et un caractère spécial"
            });
        }
        next();
    }
}
exports.AuthenticationRequestVerifications = AuthenticationRequestVerifications;
