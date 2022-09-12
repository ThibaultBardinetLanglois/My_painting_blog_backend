"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistController = void 0;
const artist_model_1 = require("../models/artist.model");
class ArtistController {
    static async getById(req, res) {
        if (!req.params.id || isNaN(Number(req.params.id))) {
            return res.status(400).json({ message: "La requête ne contient pas le bon type de paramètre" });
        }
        const artistId = Number(req.params.id);
        await artist_model_1.ArtistModel.getById(artistId)
            .then((artist) => {
            if (Array.isArray(artist) && artist.length === 0) {
                return res.status(400).json({ message: "L'identifiant fourni dans la requête n'est pas enregistré dans la base de données" });
            }
            return res.status(200).json({ artist: artist[0] });
        });
    }
}
exports.ArtistController = ArtistController;
_a = ArtistController;
ArtistController.getAll = async (req, res) => {
    await artist_model_1.ArtistModel.getAll()
        .then((artists) => {
        res.status(200).json({ artists: artists });
    })
        .catch(err => {
        res.status(500).json({ message: "Problème de connexion à la base de données" });
    });
};
