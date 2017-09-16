const Heap = require("@markon95/heap");
const Arr = Array.prototype;

const isArrayLike = function isArrayLike(o) { // https://stackoverflow.com/a/24048615
  return(
    Array.isArray(o) ||
    !!o &&
    typeof o === "object" &&
    o.hasOwnProperty("length") &&
    typeof o.length === "number" &&
    (o.length === 0 ||
    (o.length > 0 && (o.length - 1) in o))
  );
};

const defaultCmp = function defaultCmp(a, b) {
  if(typeof a === "number" && typeof b === "number") {
    return a < b ? -1 : (a > b ? 1 : 0);
  }

  if(typeof a === "string" && typeof b === "string") {
    let a_code, b_code;

    for(let i = 0; i < Math.min(a.length, b.length); i++) {
      a_code = a.charCodeAt(i);
      b_code = b.charCodeAt(i);

      if(a_code < b_code) { return -1; }
      if(a_code > b_code) { return 1; }
    }

    return a.length < b.length ? -1 : (a.length > b.length ? 1 : 0);
  }

  throw new Error("defaultCmp only compares numbers and strings");
};

const PriorityQueue = function PriorityQueue(other, comparator) {
  if(!(this instanceof PriorityQueue)) {
    return new PriorityQueue(other, comparator);
  }

  this._cmp = defaultCmp;
  this._heap = new Heap();

  if(other instanceof PriorityQueue) {
    this._cmp = other._cmp;
    this._heap = new Heap(other._heap, other._cmp)
  }
  else if(isArrayLike(other)) {
    if(typeof comparator === "function") {
      this._cmp = comparator;
    }

    this._heap = new Heap(other, this._cmp);
  }
  else if(typeof other === "function") {
    this._cmp = other;
    this._heap = new Heap(this._cmp);
  }
};

PriorityQueue.merge = function(q1, q2, comparator) {
  if(q1 instanceof PriorityQueue && q2 instanceof PriorityQueue) {
    let data = Heap.merge(q1._heap, q2._heap).toArray();

    return new PriorityQueue(data, comparator);
  }
  else {
    throw new Error("expected arguments to be priority queues");
  }
};

PriorityQueue.prototype.peek = function() {
  if(!this.isEmpty()) {
    return this._heap.peek();
  }
};

PriorityQueue.prototype.enqueue = function(el) {
  this._heap.push(el);

  return this;
};

PriorityQueue.prototype.dequeue = function() {
  return this._heap.pop();
};

PriorityQueue.prototype.size = function() {
  return this._heap.size();
};

PriorityQueue.prototype.isEmpty = function() {
  return this.size() === 0;
};

module.exports = PriorityQueue;
