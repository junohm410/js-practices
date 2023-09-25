import timers from "timers/promises";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

console.log("======コールバック/エラーなし======");
console.log();

// コールバック/エラーなしのコードと実行
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
console.log();
console.log("======コールバック/エラーあり======");
console.log();

// コールバック/エラーありのコードと実行
db.run(
  "create table books(id integer primary key autoincrement, title text unique)",
  () =>
    db.run("insert into book (title) values(?)", "チェリー本", function (err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`自動採番id: ${this.lastID}`);
      }
      db.get("select * from book where id = ?", 1, (err, row) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`id:${row.id} タイトル:${row.title}`);
        }
        db.run("drop table books");
      });
    })
);

await timers.setTimeout(100);
console.log();
console.log("======Promise/エラーなし======");
console.log();

// Promise版以降で使用する関数の定義
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
        console.log(`id:${row.id} タイトル:${row.title}`);
        resolve();
      }
    });
  });
};

const dropTable = (table) => {
  db.run(`drop table ${table}`);
};

// Promise版/エラーなしの実行
createTable("books")
  .then(() => insertItem("books", "チェリー本"))
  .then(() => displayItemsById("books", 1))
  .then(() => dropTable("books"));

await timers.setTimeout(100);
console.log();
console.log("======Promise/エラーあり======");
console.log();

// Promise版/エラーありの実行
createTable("books")
  .then(() => insertItem("book", "チェリー本"))
  .catch((err) => console.error(err.message))
  .then(() => displayItemsById("book", 1))
  .catch((err) => console.error(err.message))
  .then(() => dropTable("books"));

await timers.setTimeout(100);
console.log();
console.log("======async,await/エラーなし======");
console.log();

// async,await版/エラーなしの関数の定義と実行
const addBook = async () => {
  await createTable("books");
  await insertItem("books", "チェリー本");
  await displayItemsById("books", 1);
  await dropTable("books");
};

addBook();

await timers.setTimeout(100);
console.log();
console.log("======async,await/エラーあり======");
console.log();

// async,await版/エラーありの関数の定義と実行
const addBookWithError = async () => {
  try {
    await createTable("books");
    await insertItem("book", "チェリー本");
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
