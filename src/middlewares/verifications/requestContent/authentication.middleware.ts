import { Request, Response } from 'express';
import { RegexChecking } from '../../../utils/regex.utils';

/* Request to check incomming request content to register a user correctly */
export class AuthenticationRequestVerifications {
  public static verifyPresenceOfFieldsForRegister(req: Request, res: Response, next: Function){
    if (Object.keys(req.body).length !== 3) {
      return res.status(400).json(
        {
          message: "La requête ne contient pas les bonnes informations"
        }
      )
    }
    next();
  }

  public static verifyPresenceOfFieldsForLogin(req: Request, res: Response, next: Function) {
    if (Object.keys(req.body).length !== 2) {
      return res.status(400).json(
        {
          message: "La requête ne contient pas les bonnes informations"
        }
      )
    }
    next();
  }

  public static verifyUsernamePresence(req: Request, res: Response, next: Function){
    const { username } = req.body
    if (
      !username ||
      typeof username !== "string" ||
      username.length === 0 
    ) {
      return res.status(422).json(
        {
          message: "Le nom donnée n'est pas du bon type et/ou n'est pas présent"
        }
      )
    }
    next();
  }

  public static verifyEmailPresence(req: Request, res: Response, next: Function){
    const { email } = req.body
    if (
      !email ||
      typeof email !== "string" ||
      email.length === 0 
    ) {
      return res.status(422).json(
        {
          message: "L'email' donnée n'est pas du bon type et/ou n'est pas présent"
        }
      )
    }
    next();
  }

  public static verifyEmailSyntax(req: Request, res: Response, next: Function){
    const { email } = req.body
    if (!RegexChecking.verifyEmailSyntax(email)) {
      return res.status(422).json(
        {
          message: "L'email donné n'a pas la bonne syntaxe"
        }
      )
    }
    next();
  }

  public static verifyPasswordPresence(req: Request, res: Response, next: Function){
    const { password } = req.body
    if (
      !password ||
      typeof password !== "string" ||
      password.length === 0 
    ) {
      return res.status(422).json(
        {
          message: "Le mot de passe n'est pas du bon type et/ou n'est pas présent"
        }
      )
    }
    next();   
  }

  public static verifyPasswordSyntax(req: Request, res: Response, next: Function){
    const { password } = req.body
    if (!RegexChecking.verifyPasswordSyntax(password)) {
      return res.status(422).json(
        {
          message: "Le mot de passe n'a pas la bonne syntaxe, il doit contenir au moins 8 lettres dont au moins 1 majuscule, une minuscule, un chiffre et un caractère spécial"
        }
      )
    }
    next();   
  }
}