import { Request, Response } from 'express';
import { ArtistModel } from '../models/artist.model';

export class ArtistController {
  public static getAll = async (req: Request, res: Response): Promise<any> => {
      await ArtistModel.getAll()
        .then((artists) => {
          res.status(200).json({artists: artists})
        })
        .catch(err => {
          res.status(500).json({message: "Problème de connexion à la base de données"})
        })
  }

  public static async getById(req: Request, res: Response) {
    if (!req.params.id || isNaN(Number(req.params.id))) {
      return res.status(400).json({message: "La requête ne contient pas le bon type de paramètre"})
    }
  
    const artistId = Number(req.params.id) 
    
    await ArtistModel.getById(artistId)
      .then((artist: Array<object>) => {
        if (Array.isArray(artist) && artist.length === 0) {
          return res.status(400).json({message: "L'identifiant fourni dans la requête n'est pas enregistré dans la base de données"})
        } 
        return res.status(200).json({artist: artist[0]})
      })
  }
}

