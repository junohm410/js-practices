import { MemoApp } from "./memo_app.js";
import Memo from "./memo.js";
import ReadMemoSelector from "./read_memo_selector.js";

export default class ReadMemoCommand {
  #memos;
  execute = async () => {
    const memos = await MemoApp.retrieveAllMemos();
    if (memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos = memos.map((memo) => new Memo(memo));
    const memoSelector = new ReadMemoSelector(this.#memos);
    const selectedMemo = await memoSelector.askForSelection();
    console.log(selectedMemo.content);
  };
}
