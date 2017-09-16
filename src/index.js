const Heap = require("@markon95/heap");

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

/**
* Creates a PriorityQueue according to the arguments passed
* @constructor
* @param {(Object|PriorityQueue|Function)} other
* Can be an Array like Object from which all elements will be added to the queue,
* another PriorityQueue instance or just a custom comparator function. The comparator function
* will determine which element has the highest priority. It should take two elements as arguments
* and return -1 if the first element has a higher priority, 1 if the second element has a higher priority
* or 0 if they both have the same priority. In general if no comparator function is provided, a default
* will be used. The default sorts numbers in ascending order and strings lexicographically.
* @param {Function} comparator If other is an Array like Object or another PriorityQueue,
* the custom comparator can always be passed as a second argument.
* @returns {PriorityQueue} The PriorityQueue instance.
*/
const PriorityQueue = function PriorityQueue(other, comparator) {
  if(!(this instanceof PriorityQueue)) {
    return new PriorityQueue(other, comparator);
  }

  this._cmp = defaultCmp;
  this._heap = new Heap(this._cmp);

  if(other instanceof PriorityQueue) {
    this._cmp = other._cmp;
    this._heap = new Heap(other._heap, other._cmp);
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

/**
* Merges two PriorityQueue's into a new one.
* @param {PriorityQueue} q1 the first priority queue
* @param {PriorityQueue} q2 the second priority queue
* @param {Function} comparator A custom comparator function. If none is provied,
* the new priority queue will use the default comparator.
* @returns {PriorityQueue} The newly merged priority queue
*/
PriorityQueue.merge = function(q1, q2, comparator) {
  if(q1 instanceof PriorityQueue && q2 instanceof PriorityQueue) {
    let data = Heap.merge(q1._heap, q2._heap).toArray();

    return new PriorityQueue(data, comparator);
  }
  else {
    throw new Error("expected arguments to be priority queues");
  }
};

/**
* Returns the element with the highest priority
* @returns {*} The element with the highest priority
*/
PriorityQueue.prototype.peek = function() {
  if(!this.isEmpty()) {
    return this._heap.peek();
  }
};

/**
* Enqueues a new element according to it's priority
* @returns {this} The PriorityQueue instance
*/
PriorityQueue.prototype.enqueue = function(el) {
  this._heap.push(el);

  return this;
};

/**
* Dequeues the element with the highest priority and returns it
* @returns {*} The dequeued element
*/
PriorityQueue.prototype.dequeue = function() {
  return this._heap.pop();
};

/**
* Returns the number of elements in the priority queue
* @returns {number} The size of the priority queue
*/
PriorityQueue.prototype.size = function() {
  return this._heap.size();
};

/**
* Returns true if the priority queue is empty
* @returns {boolean} True if priority queue is empty. False otherwise
*/
PriorityQueue.prototype.isEmpty = function() {
  return this.size() === 0;
};

module.exports = PriorityQueue;
