<a name="PriorityQueue"></a>

## PriorityQueue
**Kind**: global class  

* [PriorityQueue](#PriorityQueue)
    * [new PriorityQueue(other, comparator)](#new_PriorityQueue_new)
    * _instance_
        * [.peek()](#PriorityQueue+peek) ⇒ <code>\*</code>
        * [.enqueue()](#PriorityQueue+enqueue) ⇒ <code>this</code>
        * [.dequeue()](#PriorityQueue+dequeue) ⇒ <code>\*</code>
        * [.size()](#PriorityQueue+size) ⇒ <code>number</code>
        * [.isEmpty()](#PriorityQueue+isEmpty) ⇒ <code>boolean</code>
    * _static_
        * [.merge(q1, q2, comparator)](#PriorityQueue.merge) ⇒ [<code>PriorityQueue</code>](#PriorityQueue)

<a name="new_PriorityQueue_new"></a>

### new PriorityQueue(other, comparator)
Creates a PriorityQueue according to the arguments passed

**Returns**: [<code>PriorityQueue</code>](#PriorityQueue) - The PriorityQueue instance.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Object</code> \| [<code>PriorityQueue</code>](#PriorityQueue) \| <code>function</code> | Can be an Array like Object from which all elements will be added to the queue, another PriorityQueue instance or just a custom comparator function. The comparator function will determine which element has the highest priority. It should take two elements as arguments and return -1 if the first element has a higher priority, 1 if the second element has a higher priority or 0 if they both have the same priority. In general if no comparator function is provided, a default will be used. The default sorts numbers in ascending order and strings lexicographically. |
| comparator | <code>function</code> | If other is an Array like Object or another PriorityQueue, the custom comparator can always be passed as a second argument. |

<a name="PriorityQueue+peek"></a>

### priorityQueue.peek() ⇒ <code>\*</code>
Returns the element with the highest priority

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>\*</code> - The element with the highest priority  
<a name="PriorityQueue+enqueue"></a>

### priorityQueue.enqueue() ⇒ <code>this</code>
Enqueues a new element according to it's priority

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>this</code> - The PriorityQueue instance  
<a name="PriorityQueue+dequeue"></a>

### priorityQueue.dequeue() ⇒ <code>\*</code>
Dequeues the element with the highest priority and returns it

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>\*</code> - The dequeued element  
<a name="PriorityQueue+size"></a>

### priorityQueue.size() ⇒ <code>number</code>
Returns the number of elements in the priority queue

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>number</code> - The size of the prioriy queue  
<a name="PriorityQueue+isEmpty"></a>

### priorityQueue.isEmpty() ⇒ <code>boolean</code>
Returns true if the priority queue is empty

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>boolean</code> - True if priority queue is empty. False otherwise  
<a name="PriorityQueue.merge"></a>

### PriorityQueue.merge(q1, q2, comparator) ⇒ [<code>PriorityQueue</code>](#PriorityQueue)
Merges two PriorityQueue's into a new one.

**Kind**: static method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: [<code>PriorityQueue</code>](#PriorityQueue) - The newly merged priority queue  

| Param | Type | Description |
| --- | --- | --- |
| q1 | [<code>PriorityQueue</code>](#PriorityQueue) | the first priority queues |
| q2 | [<code>PriorityQueue</code>](#PriorityQueue) | the second priority queue |
| comparator | <code>function</code> | A custom comparator function. If none is provied, the new priority queue will use the default comparator. |

