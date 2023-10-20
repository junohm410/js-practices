export default class ListMemosCommand {
  #memos;
  constructor(memos) {
    this.#memos = memos;
  }
  execute = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    this.#memos.forEach((memo) => console.log(memo.firstLine));
  };
}
