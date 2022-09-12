"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authentication_middleware_1 = require("../middlewares/security/authentication.middleware");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', authentication_middleware_1.verifyToken, user_controller_1.UserController.getAll);
exports.default = usersRouter;
