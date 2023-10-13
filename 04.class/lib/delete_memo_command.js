import enquirer from "enquirer";
const { prompt } = enquirer;
import { db, MemoApp } from "./memo_app.js";
import Memo from "./memo.js";

export default class DeleteMemoCommand {
  #memos;
  execute = async () => {
    const memos = await MemoApp.organizeAllMemos();
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
      message: "削除したいメモを選んでください:",
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
