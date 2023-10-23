import MemoSelector from "./memo_selector.js";
import ReadlineInterface from "./readline_interface.js";

export default class MemoController {
  #memos;
  #repository;
  constructor(memos, repository) {
    this.#memos = memos;
    this.#repository = repository;
  }
  listMemos = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos.forEach((memo) => console.log(memo.firstLine));
  };
  readMemo = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    const selectionMessage = "表示したいメモを選んでください:";
    const memoSelector = new MemoSelector(this.#memos, selectionMessage);
    const selectedMemo = await memoSelector.askForSelection();
    const targetMemo = this.#memos.find((memo) => selectedMemo.id === memo.id);
    console.log(targetMemo.content);
  };
  deleteMemo = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    const selectionMessage = "削除したいメモを選んでください:";
    const memoSelector = new MemoSelector(this.#memos, selectionMessage);
    const selectedMemo = await memoSelector.askForSelection();
    this.#repository.deleteMemo(selectedMemo.id);
  };
  insertMemo = async () => {
    const readlineInterface = new ReadlineInterface();
    await readlineInterface.readInputLines();
    if (readlineInterface.isInputFirstLineEmpty()) {
      console.log("注: 1行目が空白だけのメモは追加できません。");
    } else {
      const newMemo = readlineInterface.newMemoByInputLines;
      this.#repository.saveMemo(newMemo);
    }
  };
}
