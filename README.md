Priority Queue
==============

[![Build Status](https://travis-ci.org/azurite/priority-queue.svg)](https://travis-ci.org/azurite/priority-queue)
[![dependencies Status](https://david-dm.org/azurite/priority-queue/status.svg)](https://david-dm.org/azurite/priority-queue)
[![npm version](https://badge.fury.io/js/%40darkblue_azurite%2Fpriority-queue.svg)](https://badge.fury.io/js/%40darkblue_azurite%2Fpriority-queue)

A priority queue implemented with a binary heap

Installation
------------

For node js:

```
npm install --save @darkblue_azurite/priority-queue
```

then require it:

```js
var PriorityQueue = require("@darkblue_azurite/priority-queue");
```

To use the library directly in the browser, copy the `priority-queue.js` file from the lib
directory into your project and include it in your webpage. `priority-queue.min.js` provides
you with a minified version. The files in the lib directory are also transpiled to es5.

```html
<script type="text/javascript" src="./priority-queue.js"></script>
<script type="text/javascript">
  var queue = new PriorityQueue(); // available as a global
</script>
```

Example Usage
-------------

```js
var tasks = [
  { task: "Wash the Dishes", priority: 5 },
  { task: "Clean the Bedroom", priority: 3 },
  { task: "Feed the Cat", priority: 1 },
  { task: "Do Groccery Shopping", priority: 8 }
];

var queue = new PriorityQueue(tasks, function(t1, t2) {
  return t1.priority - t2.priority;
});

queue.size(); // 4
queue.dequeue(); // { task: "Feed the Cat", priority: 1 }
queue.enqueue({ task: "Go to the Gym", priority: 2 });
```

Documentation
-------------
* [API Documentation](../master/docs/API.md)
