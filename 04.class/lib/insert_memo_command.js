import { db } from "./memo_app.js";
import ReadlineInterface from "./readline_interface.js";

export default class InsertMemoCommand {
  execute = async () => {
    const readlineInterface = new ReadlineInterface()
    await readlineInterface.readInputLines();
    if (readlineInterface.isInputFirstLineEmpty()) {
      console.log("注: 1行目が空白だけのメモは追加できません。");
    } else {
      const newMemo = readlineInterface.formatInputLinesToMemo();
      db.run(`insert into memos(content) values(?)`, [newMemo], () => {
        console.log("メモの追加が完了しました。");
      });
    }
  };
}
