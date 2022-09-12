import { Request, Response } from "express";
import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const secret = process.env.SERVER_SECRET as string;
import { UserModel } from "../../models/user.model";


const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const hashPassword = (req: Request, res: Response, next: Function) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword: string) => {
      console.log("Generated password: ", hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

export const comparePassword = (req: Request, res: Response, next: Function) => {
  argon2
    .verify(
      req.body.userFoudIndDB.hashed_password, 
      req.body.password,
      hashingOptions
      )
    .then((isPasswordCorrect: boolean) => {
      if (!isPasswordCorrect) {
        return res.status(403).json(
          {
            message: "Le mot de passe est incorrect"
          }
        )
      }
      req.body = req.body.userFoudIndDB;
      delete req.body.hashed_password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}


// DECODE TOKEN TO AUTHORIZE USER MAKE ACTIONS
interface DecodedToken {
  id: number,
  username: string,
  email: string,
  role: string,
  iat: number,
  exp: number
};

interface RequestWithUserRole extends Request {
  decodedToken?: DecodedToken,
}
export const verifyToken = (req: RequestWithUserRole, res: Response, next: Function) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if (token) {
    jwt.verify(token, secret, async (err: any, decodedToken: any) => {
      if (err) {
        console.log("Error when attempting to verify token authenticity =>", err)
        return res
          .status(403)
          .json(
            { 
              message: "Peut être que votre session a expirée, en tout cas le token contenu dans votre requête est invalide, vous devez vous connecter"
            }
          )
      } 
      req.decodedToken = decodedToken;
      console.log("req decoded token =>", req.decodedToken)
      next()
    })
  } else {
    return res
      .status(403)
      .json(
        { 
          message: "Vous devez être connecté pour accéder à certains contenus. Actuellement la requête nécéssite un jeton d'authentification"
        }
      )
  }
  
}
