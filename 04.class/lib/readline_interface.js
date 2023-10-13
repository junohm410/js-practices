import * as readline from "node:readline/promises";

export default class ReadlineInterface {
  #inputLines;
  #interface = readline.createInterface({ input: process.stdin });
  readInputLines = async () => {
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
  formatInputLinesToMemo = () => {
    return this.#inputLines.join("\n");
  };
}
