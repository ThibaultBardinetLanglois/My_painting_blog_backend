"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.comparePassword = exports.hashPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SERVER_SECRET;
const hashingOptions = {
    type: argon2_1.default.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};
const hashPassword = (req, res, next) => {
    argon2_1.default
        .hash(req.body.password, hashingOptions)
        .then((hashedPassword) => {
        console.log("Generated password: ", hashedPassword);
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
    })
        .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};
exports.hashPassword = hashPassword;
const comparePassword = (req, res, next) => {
    argon2_1.default
        .verify(req.body.userFoudIndDB.hashed_password, req.body.password, hashingOptions)
        .then((isPasswordCorrect) => {
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Le mot de passe est incorrect"
            });
        }
        req.body = req.body.userFoudIndDB;
        delete req.body.hashed_password;
        next();
    })
        .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};
exports.comparePassword = comparePassword;
;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log("Error when attempting to verify token authenticity =>", err);
                return res
                    .status(403)
                    .json({
                    message: "Peut être que votre session a expirée, en tout cas le token contenu dans votre requête est invalide, vous devez vous connecter"
                });
            }
            req.decodedToken = decodedToken;
            console.log("req body decoded token =>", req.decodedToken);
            next();
        });
    }
    else {
        return res
            .status(403)
            .json({
            message: "Vous devez être connecté pour accéder à certains contenus. Actuellement la requête nécéssite un jeton d'authentification"
        });
    }
};
exports.verifyToken = verifyToken;
