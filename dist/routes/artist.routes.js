"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artist_controller_1 = require("../controllers/artist.controller");
const artistsRouter = (0, express_1.Router)();
artistsRouter.get('/', artist_controller_1.ArtistController.getAll);
artistsRouter.get('/:id', artist_controller_1.ArtistController.getById);
exports.default = artistsRouter;
