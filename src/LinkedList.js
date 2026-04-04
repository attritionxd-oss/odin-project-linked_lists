import Node from "./Node.js";

export default class LinkedList {
  constructor() {
    this._head = null;
  }

  append(value) {
    if (!this.head) this.prepend(value);
    else {
      let curNode = this.head;
      while (curNode.next) curNode = curNode.next;
      curNode.next = new Node(value);
    }
  }

  prepend(value) {
    let curNode = null;
    if (this.head) curNode = this.head;
    this.head = new Node(value);
    this.head.next = curNode;
  }

  size() {
    let curNode = this.head;
    let length = 0;
    while (curNode) {
      curNode = curNode.next;
      length++;
    }
    return length;
  }

  get head() {
    return this._head;
  }

  set head(node) {
    this._head = node;
  }

  tail() {
    let curNode = this.head;
    while (curNode.next) curNode = curNode.next;
    return curNode;
  }

  at(idx) {
    let curNode = this.head;
    let n = 0;
    while (n < idx) {
      if (!curNode.next) throw new Error("Index out-of-bounds");
      curNode = curNode.next;
      n++;
    }
    if (curNode) return curNode;
  }

  pop() {
    if (!this.head) return;

    const prev = this.head;
    this.head = this.head.next;
    return prev;
  }

  contains(value) {
    if (!this.head || !value) return false;
    let curNode = this.head;
    while (curNode) {
      if (curNode.value === value) return true;
      curNode = curNode.next;
    }
    return false;
  }

  findIndex(value) {
    if (!this.head || !value) return;
    let curNode = this.head;
    let idx = 0;
    do {
      if (curNode.value === value) return idx;
      curNode = curNode.next;
      idx++;
    } while (curNode.next);
    return -1;
  }

  #listItems() {
    let curNode = this.head;
    const list = [];
    while (curNode) {
      list.push(curNode.value);
      curNode = curNode.next;
    }
    return list;
  }

  toString() {
    const list = [...this.#listItems(), "null"];
    if (!this.head) return "";
    return list
      .map((item) => (item === "null" ? "null" : `( ${item} )`))
      .join(" -> ");
  }

  insertAt(idx, ...values) {
    if (idx < 0 || values.length === 0) return;
    if (idx >= this.size()) throw new Error("RangeError: Index out-of-bounds");

    if (idx === 0) {
      const oldHead = this.head;
      const dummyNode = new Node(null);
      let curNode = dummyNode;

      values.forEach((value) => {
        curNode.next = new Node(value);
        curNode = curNode.next;
      });

      curNode.next = oldHead;
      this.head = dummyNode.next;
      return;
    }

    let prevNode = this.head;
    for (let i = 0; i < idx - 1; i++) {
      prevNode = prevNode.next;
    }
    let remainder = prevNode.next;

    let current = prevNode;
    values.forEach((value) => {
      current.next = new Node(value);
      current = current.next;
    });

    current.next = remainder;
  }

  removeAt(idx) {
    if (idx === undefined || idx < 0) return;
    if (idx > this.size() - 1)
      throw new Error("RangeError: Index out-of-bounds");
    if (!this.head) return "NoChanges: List already empty";

    if (idx === 0) {
      this.head = this.head.next;
      return;
    }

    const prev = this.at(idx - 1);
    const removedNode = prev.next;
    prev.next = prev.next.next;
    return removedNode;
  }
}
