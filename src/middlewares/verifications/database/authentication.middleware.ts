import { Request, Response } from 'express';
import { UserModel } from '../../../models/user.model';

export class AuthenticationDBVerifications {
  public static findUserInDbByUsername(req: Request, res: Response, next: Function) {
    const { username } = req.body;
    UserModel.getByUsername(username)
    .then(user => {
      console.log("USER in DB =>", user)
      if (user && user.length > 0) {
        req.body.userFoudIndDB = user[0]
      }
      next();
    })
    .catch(err => {
      console.log("Error in mdw : ", err);
      res.status(500).json(
        {
          message: `Erreur lors de la vérification de l'existence du nom ${req.body.username} dans la base de données`
        }
      )
      
    })
  }

  public static dontAuthorizeDuplicateUsername(req: Request, res: Response, next: Function) {
    if (req.body.userFoudIndDB) {
      return res.status(422).json({message: "Ce nom est déjà utilisé par un autre utilisateur"});
    }
      next();
  }

  public static checkIfUserExistForLogin(req: Request, res: Response, next: Function) {
    if (!req.body.userFoudIndDB) {
      return res.status(422).json({message: "Cet utilisateur n'existe pas en base de données"});
    }
    next();
  }
}