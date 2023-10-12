import * as readline from "node:readline/promises";
import { db } from "./memo_app.js";

export class InsertMemoCommand {
  execute = async () => {
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
