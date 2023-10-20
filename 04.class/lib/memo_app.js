import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("memo.sqlite");
import Memo from "./memo.js";
import ListMemosCommand from "./list_memos_command.js";
import ReadMemoCommand from "./read_memo_command.js";
import DeleteMemoCommand from "./delete_memo_command.js";
import InsertMemoCommand from "./insert_memo_command.js";

export class MemoApp {
  #memos
  #options
  constructor(allMemos, options) {
    this.#memos = allMemos.map((memo) => new Memo(memo));
    this.#options = options
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
    const memos = this.#memos
    if (options.l) {
      new ListMemosCommand(memos).execute();
    } else if (options.r) {
      new ReadMemoCommand(memos).execute();
    } else if (options.d) {
      new DeleteMemoCommand(memos).execute();
    } else {
      new InsertMemoCommand().execute();
    }
  }
}
