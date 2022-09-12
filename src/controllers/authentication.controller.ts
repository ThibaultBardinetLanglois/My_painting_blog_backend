import { Request, Response }  from "express";
import { RowDataPacket } from "mysql2";
import { Utils } from "../utils/utils.utils";
import { AuthenticationModel } from "../models/authentication.model";
import { UserModel } from "../models/user.model";

export class AuthenticationController {
  public static register = async (req: Request, res: Response) => {
    await AuthenticationModel.register(req.body)
    .then(async (response: RowDataPacket | object) => {
      const lastInsertId = {...response}.insertId;
      await UserModel.getById(lastInsertId)
      .then((lastInsertedUser: RowDataPacket | object) => {
        let userPayload = {...lastInsertedUser}["0"]
        delete userPayload.hashed_password;
        const token = Utils.generateToken(userPayload);
        
        return res.status(201).json(
          {
            message: `L'utilisateur ${req.body.username} a bien été créé`,
            user: userPayload,
            token: token,
          }
        )  
      })
    })
    .catch(err => {
      console.log("ERROR =>", err);
      res.status(400).json(
        {
          message: `Erreur lors de l'enregistrement de ${req.body.username}`
        }
      )
    })
  }

  public static login = async (req: Request, res: Response) => {
    console.log("controller login =>", req.body);
    
    const token = Utils.generateToken(req.body);
        
        return res.status(201).json(
          {
            message: `Vous êtes désormais connecté`,
            user: req.body,
            token: token,
          }
        )  
    
  }
}