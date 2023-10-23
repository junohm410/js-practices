import { db } from "./memo_app.js";
import MemoSelector from "./memo_selector.js";
import ReadlineInterface from "./readline_interface.js";

export default class MemoController {
  #memos;
  constructor(memos) {
    this.#memos = memos;
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
    db.run("delete from memos where id = ?", [selectedMemo.id], () => {
      console.log("メモの削除が完了しました。");
    });
  };
  insertMemo = async () => {
    const readlineInterface = new ReadlineInterface();
    await readlineInterface.readInputLines();
    if (readlineInterface.isInputFirstLineEmpty()) {
      console.log("注: 1行目が空白だけのメモは追加できません。");
    } else {
      const newMemo = readlineInterface.newMemoByInputLines;
      db.run(`insert into memos(content) values(?)`, [newMemo], () => {
        console.log("メモの追加が完了しました。");
      });
    }
  };
}
