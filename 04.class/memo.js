import minimist from "minimist";
import { MemoApp } from "./lib/memo_app.js";
import { ListMemosCommand } from "./lib/list_memos_command.js";
import { ReadMemoCommand } from "./lib/read_memo_command.js";
import { DeleteMemoCommand } from "./lib/delete_memo_command.js";

const main = async () => {
  const options = minimist(process.argv.slice(2));
  const memoApp = await MemoApp.buildMemoApp();
  if (options.l) {
    memoApp.addCommand(new ListMemosCommand());
    memoApp.command.execute();
  } else if (options.r) {
    memoApp.addCommand(new ReadMemoCommand());
    memoApp.command.execute();
  } else if (options.d) {
    memoApp.addCommand(new DeleteMemoCommand());
    memoApp.command.execute();
  } else {
    memoApp.insertMemo();
  }
};

main();
