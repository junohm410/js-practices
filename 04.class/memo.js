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
    new ListMemosCommand(allMemos).execute();
  } else if (options.r) {
    new ReadMemoCommand(allMemos).execute();
  } else if (options.d) {
    new DeleteMemoCommand(allMemos).execute();
  } else {
    new InsertMemoCommand().execute();
  }
};

main();
