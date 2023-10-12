import * as readline from "node:readline/promises";
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
  #organizeAllMemos = () => {
    return new Promise((resolve, reject) => {
      db.all(`select * from memos`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  insertMemo = async () => {
    const rl = readline.createInterface({ input: process.stdin });
    const readInputLines = () => {
      return new Promise((resolve) => {
        const lines = [];
        rl.on("line", (line) => {
          lines.push(line);
          console.log(lines);
        });
        rl.on("close", () => {
          resolve(lines);
        });
      });
    };
    const inputLines = await readInputLines();
    if (inputLines[0] === "" || inputLines[0].match(/^[\s\u3000]+$/g)) {
      console.log("注: 1行目が空白だけのメモは追加できません。");
      return;
    } else {
      const newMemo = inputLines.join("\n");
      db.run(`insert into memos(content) values(?)`, [newMemo], () => {
        console.log("メモの追加が完了しました。");
      });
    }
  };
}
