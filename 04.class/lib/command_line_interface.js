import enquirer from "enquirer";
import * as readline from "node:readline/promises";
const { prompt } = enquirer;

export default class CommandLineInterface {
  #memos;
  constructor(memos) {
    prompt.on("cancel", () => {
      process.exit();
    });
    this.#memos = memos;
  }
  askForSelectingMemo = (message) => {
    const question = this.#createSelectingQuestion(message);
    return prompt(question);
  };
  askForInsertingMemo = (message) => {
    const readlineInterface = readline.createInterface({
      input: process.stdin,
    });
    if (process.stdin.isTTY) {
      console.log(message);
    }
    return new Promise((resolve) => {
      let lines = [];
      readlineInterface.on("line", (line) => {
        lines.push(line);
      });
      readlineInterface.on("close", () => {
        resolve(lines);
      });
    });
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
}
