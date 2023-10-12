import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("memo.sqlite");

export class MemoApp {
  command;
  static buildMemoApp = async () => {
    await this.#createMemoTable();
    return new this();
  };
  static #createMemoTable = () => {
    return new Promise((resolve, reject) => {
      db.run(
        `create table if not exists memos(id integer primary key autoincrement, content text not null)`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  };
  addCommand = (command) => {
    this.command = command;
  };
  static organizeAllMemos = () => {
    return new Promise((resolve, reject) => {
      db.all(`select * from memos order by id`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
}
