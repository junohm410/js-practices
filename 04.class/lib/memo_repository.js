import { db } from "./memo_app.js";

export default class MemoRepository {
  createMemoTable = () => {
    return new Promise((resolve, reject) => {
      db.run(
        "create table if not exists memos(id integer primary key autoincrement, content text not null)",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  };
  retrieveAllMemos = () => {
    return new Promise((resolve, reject) => {
      db.all("select * from memos order by id", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  saveMemo = (content) => {
    db.run(`insert into memos(content) values(?)`, [content], () => {
      console.log("メモの追加が完了しました。");
    });
  };
  deleteMemo = (id) => {
    db.run("delete from memos where id = ?", [id], () => {
      console.log("メモの削除が完了しました。");
    });
  };
}
