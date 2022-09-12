import { QueryError, RowDataPacket } from 'mysql2';
import { Database } from '../config/database.config';

export class UserModel {
  public static async getAll(): Promise<Array<object>> {
    return new Promise<Array<object>>(async function(resolve, reject) {
      Database.pool.query(
        'SELECT id, username, email, role FROM `user`',
        function(err: QueryError, results: RowDataPacket[]) {
          if (err) {
            console.log("ERR =>", err);
            reject(err);
          } 
          resolve(results);
        }
      );
    })
  }

  public static async getById(id: number)
  : Promise<Array<object>> {
    return new Promise <Array<object>>(async function(resolve, reject) {
      Database.pool.query(
        'SELECT * FROM `user` WHERE id = ?', [id], 
        function(err: QueryError | null, result: RowDataPacket[]) {
          if (err) {
            console.log("ERR =>", err);
            reject(err)
          } 
          resolve(result)
        }
      );

    })
  }

  public static async getByUsername(username: string)
  : Promise<Array<object>> {
    return new Promise <Array<object>>(async function(resolve, reject) {
      Database.pool.query(
        'SELECT * FROM `user` WHERE username = ?', [username], 
        function(err: QueryError | null, result: RowDataPacket[]) {
          if (err) {
            console.log("ERR =>", err);
            reject(err)
          } 
          resolve(result)
        }
      );
    })
  }
}
