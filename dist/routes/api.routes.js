"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_routes_1 = __importDefault(require("./authentication.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const artist_routes_1 = __importDefault(require("./artist.routes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/auth', authentication_routes_1.default)
    .use('/users', user_routes_1.default)
    .use('/artists', artist_routes_1.default);
exports.default = apiRouter;
