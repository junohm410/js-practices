import { db } from "./memo_app.js";
import ReadMemoSelector from "./read_memo_selector.js";
import DeletedMemoSelector from "./deleted_memo_selector.js";
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
    const memoSelector = new ReadMemoSelector(this.#memos);
    const selectedMemo = await memoSelector.askForSelection();
    console.log(selectedMemo.content);
  };
  deleteMemo = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    const memoSelector = new DeletedMemoSelector(this.#memos);
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
      const newMemo = readlineInterface.formatInputLinesToMemo();
      db.run(`insert into memos(content) values(?)`, [newMemo], () => {
        console.log("メモの追加が完了しました。");
      });
    }
  };
}
