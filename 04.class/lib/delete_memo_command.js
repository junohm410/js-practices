import { db, MemoApp } from "./memo_app.js";
import Memo from "./memo.js";
import DeletedMemoSelector from "./deleted_memo_selector.js";

export default class DeleteMemoCommand {
  #memos;
  execute = async () => {
    const memos = await MemoApp.organizeAllMemos();
    if (memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos = memos.map((memo) => new Memo(memo));
    const memoSelector = new DeletedMemoSelector(this.#memos);
    const selectedMemo = await memoSelector.askForSelection();
    db.run(`delete from memos where id = ?`, [selectedMemo.id], () => {
      console.log("メモの削除が完了しました。");
    });
  };
}
