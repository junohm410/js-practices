import enquirer from "enquirer";
const { prompt } = enquirer;

export default class DeletedMemoSelector {
  #question;
  constructor(memos) {
    const choices = memos.map((memo) => {
      return {
        name: memo.firstLine(),
        message: memo.firstLine(),
        value: memo.id,
      };
    });
    this.#question = {
      type: "select",
      name: "id",
      message: "削除したいメモを選んでください:",
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
