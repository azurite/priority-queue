const assert = require("assert");
const PriorityQueue = require("../src/index");

function PriorityQueueFromArrayLike(obj, comparator) {
  let queue = new PriorityQueue(obj, comparator);
  assert.ok(queue.size() === obj.length);
}

describe("Constructor", function() {
  it("should make an empty priority queue with no arguments", function() {
    let queue = new PriorityQueue();
    assert.ok(queue instanceof PriorityQueue);
  });

  it("should accept a custom comparator function", function() {
    let comparator = function(a, b) {
      return a.value - b.value;
    };

    let queue = new PriorityQueue(comparator);

    assert.strictEqual(queue._cmp, comparator);
  });

  it("should make a priority queue from an array like object", function() {
    let data = [1, 5, 3, 7, 8, 2, 9];
    let f = function() { return arguments; };

    PriorityQueueFromArrayLike(data);
    PriorityQueueFromArrayLike(f(...data));
  });

  it("should make a priority queue from an array like object with a custom comparator", function() {
    let data = [{ value: 1 }, { value: 5 }, { value: 3 }, { value: 7 }];
    let f = function() { return arguments; };
    let compare = function(a, b) { return a.value - b.value; };

    PriorityQueueFromArrayLike(data, compare);
    PriorityQueueFromArrayLike(f(...data), compare);
  });

  it("should make a priority queue from another priority queue", function() {
    let firstQueue = new PriorityQueue([1, 2, 3]);
    let nextQueue = new PriorityQueue(firstQueue);

    assert.strictEqual(firstQueue.size(), nextQueue.size());

    for(let i = 0; i < firstQueue.size(); i++) {
      assert.strictEqual(firstQueue.dequeue(), nextQueue.dequeue());
    }
  });
});

describe("Static methods", function() {
  describe("merge", function() {
    it("should merge two priority queues into a new one", function() {
      let q1 = new PriorityQueue([5, 9, 2, 1, 6, 7]);
      let q2 = new PriorityQueue([11, 16, 19, 21, 56]);

      let newQ = PriorityQueue.merge(q1, q2);

      assert.ok(q1.size() + q2.size() === newQ.size());
    });

    it("should throw if arguments are not prioriy queues", function() {
      assert.throws(PriorityQueue.merge.bind({}, []));
    });
  });
});

describe("Instance methods", function() {
  describe("peek", function() {
    it("should return undefined on an empty prioriy queue", function() {
      let queue = new PriorityQueue();
      assert.strictEqual(queue.peek(), undefined);
    });

    it("should return the element with the highest priority in a non empty queue", function() {
      let queue = new PriorityQueue([5, 9, 1, 2, 7], (a, b) => b - a);
      assert.strictEqual(queue.peek(), 9);
    });
  });

  describe("enqueue", function() {
    it("should add a new element to the queue", function() {
      let queue = new PriorityQueue();

      queue.enqueue(5)
        .enqueue(2)
        .enqueue(1)
        .enqueue(7)
        .enqueue(3);

      assert.strictEqual(queue.size(), 5);
    });
  });

  describe("dequeue", function() {
    it("should remove the element with the hightest prioriy", function() {
      let data = [9, 1, 5, 2, 6, 7];
      let queue = new PriorityQueue(data);
      let arr = [];

      while(!queue.isEmpty()) {
        arr.push(queue.dequeue());
      }

      assert.deepEqual(arr, data.sort());
    });
  });

  describe("size", function() {
    it("should return the size of the queue", function() {
      let queue = new PriorityQueue([1, 2, 3, 4, 5]);
      assert.ok(queue.size() === 5);
    });
  });

  describe("isEmpty", function() {
    it("should return true on an empty queue", function() {
      let queue = new PriorityQueue();
      assert.strictEqual(queue.isEmpty(), true);
    });

    it("should return false on a non empty queue", function() {
      let queue = new PriorityQueue([1, 2, 3]);
      assert.strictEqual(queue.isEmpty(), false);
    });
  });
});
