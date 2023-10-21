import * as readline from "node:readline/promises";

export default class ReadlineInterface {
  #inputLines;
  #interface = readline.createInterface({ input: process.stdin });
  readInputLines = async () => {
    if (process.stdin.isTTY) {
      console.log(
        "メモを入力してください。\n最後の行を入力し終えたら、改行してCONTROL+Dで保存します。\n"
      );
    }
    this.#inputLines = await new Promise((resolve) => {
      let lines = [];
      this.#interface.on("line", (line) => {
        lines.push(line);
      });
      this.#interface.on("close", () => {
        resolve(lines);
      });
    });
  };
  isInputFirstLineEmpty = () => {
    return (
      this.#inputLines[0] === "" || this.#inputLines[0].match(/^[\s\u3000]+$/g)
    );
  };
  get newMemoByInputLines() {
    return this.#inputLines.join("\n");
  }
}
