import sqlite3 from "sqlite3";
import minimist from "minimist";
import { MemoApp } from "./lib/memo_app.js";

const main = async () => {
  const db = new sqlite3.Database("memo.sqlite");
  const options = minimist(process.argv.slice(2));
  const memoApp = await MemoApp.buildMemoApp(db, options);
  memoApp.execute();
};

main();
