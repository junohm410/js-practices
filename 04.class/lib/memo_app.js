import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("memo.sqlite");
import Memo from "./memo.js";

export class MemoApp {
  constructor(allMemos) {
    this.memos = allMemos.map((memo) => new Memo(memo));
  }
  static buildMemoApp = async () => {
    await this.#createMemoTable();
    const allMemos = await this.#retrieveAllMemos();
    return new this(allMemos);
  };
  static #createMemoTable = () => {
    return new Promise((resolve, reject) => {
      db.run(
        "create table if not exists memos(id integer primary key autoincrement, content text not null)",
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
  static #retrieveAllMemos = () => {
    return new Promise((resolve, reject) => {
      db.all("select * from memos order by id", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
}
