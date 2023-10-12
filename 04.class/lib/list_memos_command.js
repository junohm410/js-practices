import { db } from "./memo_app.js"
import { Memo } from "./memo.js";

export class ListMemosCommand {
  #memos;
  execute = async () => {
    const memos = await this.#organizeAllMemos();
    if (memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos = memos.map((memo) => new Memo(memo));
    this.#memos.forEach((memo) => console.log(memo.firstLine()));
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
}
