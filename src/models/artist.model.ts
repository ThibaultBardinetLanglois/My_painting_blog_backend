import { QueryError } from 'mysql2';
import { Database } from '../config/database.config';

export class ArtistModel {
  public static async getAll(): Promise<Array<object>> {
    return new Promise<Array<object>>(async function(resolve, reject) {
      Database.pool.query(
        'SELECT * FROM `artist`',
        function(err: QueryError, results: Array<object>) {
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
    console.log("id in model =>", id);
    
    return new Promise <Array<object>>(async function(resolve, reject) {
      Database.pool.query(
        'SELECT * FROM `artist` WHERE id = ?', [id], 
        function(err: any, result: any) {
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
