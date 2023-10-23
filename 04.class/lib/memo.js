export default class Memo {
  constructor(memo) {
    this.id = memo.id;
    this.content = memo.content;
  }
  get firstLine() {
    const content = this.content;
    const newlineIndex = content.indexOf("\n");
    return newlineIndex !== -1 ? content.slice(0, newlineIndex) : content;
  }
}
