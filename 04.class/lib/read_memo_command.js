import enquirer from "enquirer";
const { prompt } = enquirer;
import { MemoApp } from "./memo_app.js";
import Memo from "./memo.js";

export default class ReadMemoCommand {
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
}
