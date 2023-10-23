import CommandLineInterface from "./command_line_interface.js";

export default class MemoController {
  #memos;
  #repository;
  #userInterface;
  constructor(memos, repository) {
    this.#memos = memos;
    this.#repository = repository;
    this.#userInterface = new CommandLineInterface(this.#memos);
  }
  listMemos = () => {
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
    const askingMessage = "表示したいメモを選んでください:";
    const selectedMemo = await this.#userInterface.askForSelectingMemo(
      askingMessage
    );
    const targetMemo = this.#memos.find((memo) => selectedMemo.id === memo.id);
    console.log(targetMemo.content);
  };
  deleteMemo = async () => {
    if (this.#memos.length === 0) {
      console.log("メモがありません。");
      return;
    }
    const askingMessage = "削除したいメモを選んでください:";
    const selectedMemo = await this.#userInterface.askForSelectingMemo(
      askingMessage
    );
    this.#repository.deleteMemo(selectedMemo.id);
  };
  insertMemo = async () => {
    const askingMessage =
      "メモを入力してください。\n最後の行を入力し終えたら、改行してCONTROL+Dで保存します。\n";
    const inputLines = await this.#userInterface.askForInsertingMemo(
      askingMessage
    );
    if (this.#isInsertedFirstLineEmpty(inputLines)) {
      console.log("注: 1行目が空白だけのメモは追加できません。");
    } else {
      const newMemo = this.#newMemoByInputLines(inputLines);
      this.#repository.saveMemo(newMemo);
    }
  };
  #isInsertedFirstLineEmpty = (inputLines) => {
    const inputFirstLine = inputLines[0];
    return !inputFirstLine || inputFirstLine.match(/^[\s\u3000]+$/g);
  };
  #newMemoByInputLines = (inputLines) => {
    return inputLines.join("\n");
  };
}
