import { QueryError, RowDataPacket } from 'mysql2';
import { Database } from '../config/database.config';
import { User } from '../interfaces/user.interfaces';

export class AuthenticationModel {
  public static async register(user: User): Promise<Array<object>> {
    return new Promise<Array<object>>(async function(resolve, reject) {
      Database.pool.query(
        'INSERT INTO user (username, email, hashed_password, role) VALUES (?, ?, ?, "user")',
        [user.username, user.email, user.hashedPassword],
        function(err: QueryError | null, result: RowDataPacket[]) {
          if (err) {
            console.log("ERR =>", err);
            reject(err);
          } 
          resolve(result);
        }
      );
    })
  }
}