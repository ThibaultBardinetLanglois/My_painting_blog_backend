import jwt from "jsonwebtoken";
import { UserPayload } from "../interfaces/user.interfaces";

export class Utils {
  public static generateToken = (userPayload: UserPayload): string => {
    const token = jwt.sign(
      userPayload,
      process.env.SERVER_SECRET as string, 
      { expiresIn: "24h" }
    ) 
    return token;
  }
}