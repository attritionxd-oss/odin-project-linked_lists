export default class Node {
  constructor(value) {
    this.value = !value ? null : value;
    this.next = null;
  }
}
