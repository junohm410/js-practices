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
      console.log(`自動採番id: ${this.lastID}`);
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

await timers.setTimeout(100);
console.log("================================");

const createTable = (tableName) => {
  return new Promise((resolve, reject) => {
    db.run(
      `create table ${tableName}(id integer primary key autoincrement, title text unique)`,
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

const insertItem = (table, item) => {
  return new Promise((resolve, reject) => {
    db.run(`insert into ${table}(title) values(?)`, item, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log(`自動採番id: ${this.lastID}`);
        resolve();
      }
    });
  });
};

const displayItemsById = (tableName, id) => {
  return new Promise((resolve, reject) => {
    db.get(`select * from ${tableName} where id = ?`, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.error(`id:${row.id} タイトル:${row.title}`);
        resolve();
      }
    });
  });
};

const dropTable = (table) => {
  db.run(`drop table ${table}`);
};

createTable("books")
  .then(() => insertItem("books", "チェリー本"))
  .then(() => displayItemsById("books", 1))
  .then(() => dropTable("books"));

await timers.setTimeout(100);
console.log("================================");

createTable("books")
  .then(() => insertItem("books", "チェリー本"))
  .then(() => insertItem("books", "チェリー本"))
  .catch((err) => console.error(err.message))
  .then(() => displayItemsById("book", 1))
  .catch((err) => console.error(err.message))
  .then(() => dropTable("books"));

await timers.setTimeout(100);
console.log("================================");

const addBook = async () => {
  await createTable("books");
  await insertItem("books", "チェリー本");
  await displayItemsById("books", 1);
  await dropTable("books");
};

addBook();

await timers.setTimeout(100);
console.log("================================");

const addBookWithError = async () => {
  try {
    await createTable("books");
    await insertItem("books", "チェリー本");
    await insertItem("books", "チェリー本");
  } catch (err) {
    console.error(err.message);
  }
  try {
    await displayItemsById("book", 1);
  } catch (err) {
    console.error(err.message);
  }
  await dropTable("books");
};

addBookWithError();
