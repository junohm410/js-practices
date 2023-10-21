import minimist from "minimist";
import { MemoApp } from "./lib/memo_app.js";

const main = async () => {
  const options = minimist(process.argv.slice(2));
  const memoApp = await MemoApp.buildMemoApp(options);
  memoApp.execute();
};

main();
