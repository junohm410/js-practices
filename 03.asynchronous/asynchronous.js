import timers from "timers/promises";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  "create table books(id integer primary key autoincrement, title text unique)",
  () =>
    db.run("insert into books (title) values(?)", "チェリー本", function () {
      console.log(`自動採番id: ${this.lastID}`);
      db.get("select * from books where id = ?", 1, (_, row) => {
        console.log(`id:${row.id} タイトル:${row.title}`);
        db.run("drop table books");
      });
    })
);

await timers.setTimeout(100);
console.log("================================");

db.run(
  "create table books(id integer primary key autoincrement, title text unique)",
  () =>
    db.run("insert into books (title) values(?)", "チェリー本", function () {
      db.run(
        "insert into books (title) values(?)",
        "チェリー本",
        function (err) {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`自動採番id: ${this.lastID}`);
          }
          db.get("select * from book where id = ?", 1, (err, row) => {
            if (err) {
              console.error(err.message);
            } else {
              console.error(`id:${row.id} タイトル:${row.title}`);
            }
            db.run("drop table books");
          });
        }
      );
    })
);
