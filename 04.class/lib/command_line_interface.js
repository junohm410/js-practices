import enquirer from "enquirer";
import * as readline from "node:readline/promises";
const { prompt } = enquirer;

export default class CommandLineInterface {
  #memos;
  #inputLines;
  constructor(memos) {
    prompt.on("cancel", () => {
      process.exit();
    });
    this.#memos = memos;
  }
  askForSelection = async (message) => {
    const question = this.#createSelectingQuestion(message);
    return await prompt(question);
  };
  #createSelectingQuestion = (message) => {
    const choices = this.#memos.map((memo) => {
      return {
        name: memo.firstLine,
        message: memo.firstLine,
        value: memo.id,
      };
    });
    return {
      type: "select",
      name: "id",
      message,
      choices: choices,
      result() {
        return this.focused.value;
      },
    };
  };
  askForInsertingMemo = async (message) => {
    const readlineInterface = readline.createInterface({
      input: process.stdin,
    });
    if (process.stdin.isTTY) {
      console.log(message);
    }
    this.#inputLines = await new Promise((resolve) => {
      let lines = [];
      readlineInterface.on("line", (line) => {
        lines.push(line);
      });
      readlineInterface.on("close", () => {
        resolve(lines);
      });
    });
  };
  isInsertedFirstLineEmpty = () => {
    const inputFirstLine = this.#inputLines[0];
    return !inputFirstLine || inputFirstLine.match(/^[\s\u3000]+$/g);
  };
  get newMemoByInputLines() {
    return this.#inputLines.join("\n");
  }
}
