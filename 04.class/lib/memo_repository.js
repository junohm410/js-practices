export default class MemoRepository {
  #db;
  constructor(db) {
    this.#db = db;
  }
  createMemoTable = () => {
    return new Promise((resolve, reject) => {
      this.#db.run(
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
      this.#db.all("select * from memos order by id", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  saveMemo = (content) => {
    return new Promise((resolve, reject) => {
      this.#db.run(`insert into memos(content) values(?)`, [content], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
  deleteMemo = (id) => {
    return new Promise((resolve, reject) => {
      this.#db.run("delete from memos where id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
}
