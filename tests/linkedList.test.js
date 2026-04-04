import Node from "/src/Node";
import LinkedList from "/src/LinkedList";

describe("linkedList", () => {
  test("module exists", () => {
    expect(new LinkedList()).toBeDefined();
  });

  test("is an object", () => {
    expect(typeof new LinkedList()).toBe("object");
  });

  describe("has methods", () => {
    const list = new LinkedList();
    const methods = [
      "append",
      "prepend",
      "size",
      "at",
      "pop",
      "contains",
      "findIndex",
      "toString",
    ];
    methods.forEach((method) => {
      test(`has method: ${method}`, () => {
        expect(typeof list[method]).toBe("function");
      });
    });
  });

  test("prepend", () => {
    const list = new LinkedList();
    list.prepend(10);
    expect(list.head.value).toBe(10);
  });

  test("prepend then append", () => {
    const list = new LinkedList();
    list.prepend(10);
    expect(list.head.value).toBe(10);
    list.append(20);
    expect(list.tail().value).toBe(20);
  });

  const initTest = new LinkedList();
  initTest.append(100);
  initTest.prepend(200);
  initTest.prepend(300);

  describe("size", () => {
    test("empty list returns 0", () => {
      const emptyList = new LinkedList();
      expect(emptyList.size()).toBe(0);
    });
    test("single element list returns size", () => {
      const list = new LinkedList();
      list.append(100);
      expect(list.size()).toBe(1);
    });
    test("non-empty list returns size", () => {
      const list = new LinkedList();
      list.append(100);
      list.append(200);
      expect(list.size()).toBe(2);
    });
  });

  test("head", () => {
    const data = new Node(300);
    data.next = new Node(200);
    data.next.next = new Node(100);
    expect(initTest.head).toMatchObject(data);
  });

  test("tail", () => {
    const data = new Node(100);
    expect(initTest.tail().value).toBe(data.value);
  });

  describe("at", () => {
    test("at: out-of-bounds", () => {
      expect(() => initTest.at(10)).toThrow("Index out-of-bounds");
    });
    test("at", () => {
      expect(initTest.at(1).value).toBe(200);
    });
  });

  describe("pop", () => {
    test("pop empty string", () => {
      const emptyList = new LinkedList();
      expect(emptyList.pop()).toBeUndefined();
    });
    test("pop returns and removes the current head node", () => {
      const testPop = new LinkedList();
      testPop.append("a");
      testPop.append("b");
      testPop.append("c");
      expect(testPop.pop().value).toBe("a");
      expect(testPop.head.value).toBe("b");
    });
  });

  describe("contains", () => {
    test("empty list returns false", () => {
      const emptyList = new LinkedList();
      expect(emptyList.contains()).toBe(false);
    });
    test("empty arg returns false", () => {
      const list = new LinkedList();
      expect(list.contains()).toBe(false);
    });
    test("arg not found returns false", () => {
      const list = new LinkedList();
      list.append(100);
      list.append(200);
      list.append(300);
      expect(list.contains(400)).toBe(false);
    });
    test("arg when found returns true", () => {
      const list = new LinkedList();
      list.append(100);
      list.append(200);
      list.append(300);
      expect(list.contains(200)).toBe(true);
    });
  });

  describe("findIndex", () => {
    test("empty list returns undefined", () => {
      const emptyList = new LinkedList();
      expect(emptyList.findIndex("test")).toBeUndefined();
    });

    const singleItemList = new LinkedList();
    singleItemList.append(100);

    test("empty arg returns undefined", () => {
      expect(singleItemList.findIndex()).toBeUndefined();
    });
    test("single element can be found", () => {
      expect(singleItemList.findIndex(100)).toBe(0);
    });

    const list = new LinkedList();
    list.append(100);
    list.append(200);
    list.append(300);

    test("value not found returns -1", () => {
      expect(list.findIndex(400)).toBe(-1);
    });
    test("value found returns index", () => {
      expect(list.findIndex(200)).toBe(1);
    });
  });

  describe("toString", () => {
    test("empty list", () => {
      expect(new LinkedList().toString()).toBe("");
    });

    test("prepended list", () => {
      const list = new LinkedList();
      list.prepend(100);
      list.prepend(200);
      list.prepend(300);
      expect(list.toString()).toBe("( 300 ) -> ( 200 ) -> ( 100 ) -> null");
    });

    test("appended list", () => {
      const appendedList = new LinkedList();
      appendedList.append("a");
      appendedList.append("b");
      appendedList.append("c");
      expect(appendedList.toString()).toBe("( a ) -> ( b ) -> ( c ) -> null");
    });
  });

  describe("insertAt", () => {
    test("empty args return undefined", () => {
      const list = new LinkedList();
      list.append(100);
      expect(list.insertAt()).toBeUndefined();
    });
    test("index out-of-bounds throws", () => {
      const list = new LinkedList();
      list.append(100);
      expect(() => list.insertAt(1, [1])).toThrow(/RangeError/);
    });
    test("insert values (not head)", () => {
      const list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.insertAt(1, 10, 11);
      expect(list.toString()).toBe(
        "( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null",
      );
    });
    test("insert values at head", () => {
      const list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.insertAt(0, "0", "0");
      expect(list.toString()).toBe(
        "( 0 ) -> ( 0 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> null",
      );
    });
  });

  describe("removeAt", () => {
    test("empty args return undefined", () => {
      const list = new LinkedList();
      list.append(100);
      expect(list.removeAt()).toBeUndefined();
    });
    test("index in/out-of-bounds throws", () => {
      const list = new LinkedList();
      list.append(100);
      expect(() => list.removeAt(0)).not.toThrow();
      expect(() => list.removeAt(1)).toThrow(/RangeError/);
    });
    test("remove values (not head)", () => {
      const list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.removeAt(1);
      expect(list.toString()).toBe("( 1 ) -> ( 3 ) -> null");
    });
    test("remove values from head", () => {
      const list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.removeAt(0);
      expect(list.toString()).toBe("( 2 ) -> ( 3 ) -> null");
    });
  });

  describe("full test sequence", () => {
    test("test sequence", () => {
      const list = new LinkedList();
      list.append("dog");
      list.append("cat");
      list.append("parrot");
      list.append("hamster");
      list.append("snake");
      list.append("turtle");

      expect(list.toString()).toBe(
        "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null",
      );
    });
  });
});
