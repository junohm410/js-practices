import minimist from "minimist";
import { MemoApp } from "./lib/memo_app.js";
import ListMemosCommand from "./lib/list_memos_command.js";
import ReadMemoCommand from "./lib/read_memo_command.js";
import DeleteMemoCommand from "./lib/delete_memo_command.js";
import InsertMemoCommand from "./lib/insert_memo_command.js";

const main = async () => {
  const options = minimist(process.argv.slice(2));
  const memoApp = await MemoApp.buildMemoApp();
  const allMemos = memoApp.memos;
  if (options.l) {
    memoApp.addCommand(new ListMemosCommand(allMemos));
  } else if (options.r) {
    memoApp.addCommand(new ReadMemoCommand(allMemos));
  } else if (options.d) {
    memoApp.addCommand(new DeleteMemoCommand(allMemos));
  } else {
    memoApp.addCommand(new InsertMemoCommand());
  }
  memoApp.command.execute();
};

main();
