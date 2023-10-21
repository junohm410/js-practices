import enquirer from "enquirer";
const { prompt } = enquirer;

export default class MemoSelector {
  #question;
  constructor(memos, message) {
    prompt.on("cancel", () => {
      process.exit();
    });
    const choices = memos.map((memo) => {
      return {
        name: memo.firstLine,
        message: memo.firstLine,
        value: memo.id,
      };
    });
    this.#question = {
      type: "select",
      name: "id",
      message,
      choices: choices,
      result() {
        return this.focused.value;
      },
    };
  }
  askForSelection = async () => {
    return await prompt(this.#question);
  };
}
