import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run("create table books(id integer primary key autoincrement, title text unique)",
  () =>
    db.run("insert into books (title) values(?)", "チェリー本", function () {
      console.log(`自動採番id: ${this.lastID}`);
    })
  )
