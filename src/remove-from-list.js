const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */

function removeKFromList(l, k) {
  let result = null // NEW LIST
  let tail = null; // LINK TO TAIL OF RESULT
  let currentNode = l
  if (!currentNode) return null

  while (currentNode) {
    let newElement = null;

    if (currentNode.value !== undefined && currentNode.value !== k) {
      newElement = new ListNode(currentNode.value);
    }

    if (newElement) {
      if (!result) {
        result = newElement;
        tail = newElement
      } else {
        tail.next = newElement;
        tail = tail.next;
      }
    }
    currentNode = currentNode.next
  }
  return result
}

module.exports = {
  removeKFromList
};