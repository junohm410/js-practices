import Memo from "./memo.js";
import MemoController from "./memo_controller.js";
import MemoRepository from "./memo_repository.js";

export class MemoApp {
  #memos;
  #options;
  #repository;
  #controller;
  constructor(allMemos, repository, options) {
    this.#memos = allMemos.map((memo) => new Memo(memo));
    this.#options = options;
    this.#repository = repository;
    this.#controller = new MemoController(this.#memos, this.#repository);
  }
  static buildMemoApp = async (db, options) => {
    const memoRepository = new MemoRepository(db);
    await memoRepository.createMemoTable();
    const allMemos = await memoRepository.retrieveAllMemos();
    return new this(allMemos, memoRepository, options);
  };
  execute = () => {
    const options = this.#options;
    const controller = this.#controller;
    if (options.l) {
      controller.listMemos();
    } else if (options.r) {
      controller.readMemo();
    } else if (options.d) {
      controller.deleteMemo();
    } else {
      controller.insertMemo();
    }
  };
}
