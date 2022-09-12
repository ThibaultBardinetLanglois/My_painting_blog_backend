import { Request, Response }  from "express";
import { UserModel } from "../models/user.model";
import { UserPayload } from "../interfaces/user.interfaces";

export class UserController {
  
  public static getAll = async (req: Request, res: Response) => {
    await UserModel.getAll()
      .then(users => {
        return res.status(200).send(users);
      })
      .catch(err => {
        console.log("Erreur pour obtenir tous les utilisateurs en base de données, ", err);
        return res.status(500).json(
          {
            message: "Erreur pour obtenir tous les utilisateurs en base de données"
          }
        )
      })
  }
}