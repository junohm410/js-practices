import { db } from "./memo_app.js";
import DeletedMemoSelector from "./deleted_memo_selector.js";

export default class DeleteMemoCommand {
  #memos;
  constructor(memos) {
    this.#memos = memos;
  }
  execute = async () => {
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
}
