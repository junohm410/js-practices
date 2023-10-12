import * as readline from "node:readline/promises";
import enquirer from "enquirer";
const { prompt } = enquirer;
import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("memo.sqlite");
import { Memo } from "./memo.js";

export class MemoApp {
  command;
  #memos;
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
  readMemo = async () => {
    const memos = await this.#organizeAllMemos();
    if (memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos = memos.map((memo) => new Memo(memo));
    const choices = this.#memos.map((memo) => {
      return {
        name: memo.firstLine(),
        message: memo.firstLine(),
        value: memo.content,
      };
    });
    const selectedMemo = await prompt({
      type: "select",
      name: "content",
      message: "Choose a note you want to see:",
      choices: choices,
      result() {
        return this.focused.value;
      },
    });
    console.log(selectedMemo.content);
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
  deleteMemo = async () => {
    const memos = await this.#organizeAllMemos();
    if (memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos = memos.map((memo) => new Memo(memo));
    const choices = this.#memos.map((memo) => {
      return {
        name: memo.firstLine(),
        message: memo.firstLine(),
        value: memo.id,
      };
    });
    const selectedMemo = await prompt({
      type: "select",
      name: "id",
      message: "Choose a note you want to delete:",
      choices: choices,
      result() {
        return this.focused.value;
      },
    });
    db.run(`delete from memos where id = ?`, [selectedMemo.id], () => {
      console.log("メモの削除が完了しました。");
    });
  };
}
