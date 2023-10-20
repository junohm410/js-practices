import ReadMemoSelector from "./read_memo_selector.js";

export default class ReadMemoCommand {
  #memos
  constructor(memos) {
    this.#memos = memos;
  }
  execute = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    const memoSelector = new ReadMemoSelector(this.#memos);
    const selectedMemo = await memoSelector.askForSelection();
    console.log(selectedMemo.content);
  };
}
