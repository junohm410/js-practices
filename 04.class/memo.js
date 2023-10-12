import minimist from "minimist";
import { MemoApp } from "./lib/memo_app.js";
import { ListMemosCommand } from "./lib/list_memos_command.js";

const main = async () => {
  const options = minimist(process.argv.slice(2));
  const memoApp = await MemoApp.buildMemoApp();
  if (options.l) {
    memoApp.addCommand(new ListMemosCommand());
    memoApp.command.execute();
  } else if (options.r) {
    memoApp.readMemo();
  } else if (options.d) {
    memoApp.deleteMemo();
  } else {
    memoApp.insertMemo();
  }
};

main();
