import enquirer from "enquirer";
const { prompt } = enquirer;

export default class ReadMemoSelector {
  #question;
  constructor(memos) {
    prompt.on("cancel", () => {
      process.exit();
    });
    const choices = memos.map((memo) => {
      return {
        name: memo.firstLine(),
        message: memo.firstLine(),
        value: memo.content,
      };
    });
    this.#question = {
      type: "select",
      name: "content",
      message: "表示したいメモを選んでください:",
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
