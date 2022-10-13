/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class StackNode {
  constructor(x) {
    this.value = x;
    this.next = null;
  }
}


class Stack {
  constructor() {
    this.head = null
    this.length = 0
  }


  push(element) {
    if (this.length === 0) {
      this.head = new StackNode(element)
    } else {
      let current = this.head

      while (current.next) {
        current = current.next
      }
      current.next = new StackNode(element)
    }
    this.length++
  }

  pop() {
    let current = this.head
    if (!this.length) return undefined


    while (current.next) {
      console.log(current.next);
      if (current.next.next === null) {
        let lastElement = current.next;
        current.next = null
        this.length--
        return lastElement.value
      }
      current = current.next
    }

    return current.value
  }


  peek() {
    let current = this.head
    while (current.next) {
      current = current.next
    }
    return current.value
  }
}

module.exports = {
  Stack
};