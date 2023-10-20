import { MemoApp } from "./memo_app.js";
import Memo from "./memo.js";

export default class ListMemosCommand {
  #memos;
  execute = async () => {
    const memos = await MemoApp.organizeAllMemos();
    if (memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos = memos.map((memo) => new Memo(memo));
    this.#memos.forEach((memo) => console.log(memo.firstLine));
  };
}
