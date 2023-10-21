import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("memo.sqlite");
import Memo from "./memo.js";
import MemoController from "./memo_controller.js";

export class MemoApp {
  #memos
  #options
  #controller
  constructor(allMemos, options) {
    this.#memos = allMemos.map((memo) => new Memo(memo));
    this.#options = options
    this.#controller = new MemoController(this.#memos);
  }
  static buildMemoApp = async (options) => {
    await this.#createMemoTable();
    const allMemos = await this.#retrieveAllMemos();
    return new this(allMemos, options);
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
  execute = () => {
    const options = this.#options
    const controller = this.#controller
    if (options.l) {
      controller.listMemos();
    } else if (options.r) {
      controller.readMemo();
    } else if (options.d) {
      controller.deleteMemo();
    } else {
      controller.insertMemo();
    }
  }
}
