//const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  nodes = null

  currentNode = null;

  root() {
    return this.nodes
  }

  add(data) {
    if (this.nodes === null) {
      this.nodes = {
        data: data,
        parent: null,
        leftChild: null,
        rightChild: null
      }
      return true;
    }
    if (this.currentNode == null) this.currentNode = this.nodes
    if (data > this.currentNode.data) {
      if (this.currentNode.rightChild == null) {
        this.currentNode.rightChild = {
          data: data,
          parent: this.currentNode.data,
          leftChild: null,
          rightChild: null
        }
        this.currentNode = null
      } else {
        this.currentNode = this.currentNode.rightChild
        this.add(data)
      }
    } else if (data < this.currentNode.data) {
      if (this.currentNode.leftChild == null) {
        this.currentNode.leftChild = {
          data: data,
          parent: this.currentNode.data,
          leftChild: null,
          rightChild: null
        }
        this.currentNode = null
      } else {
        this.currentNode = this.currentNode.leftChild
        this.add(data)
      }
    } else {
      this.currentNode = null
    }

    return true;
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    let currentNode = this.nodes

    while (data !== currentNode.data) {

      if (data < currentNode.data) {
        currentNode = currentNode.leftChild
      } else {
        currentNode = currentNode.rightChild
      }
      if (currentNode == null) return null

    }
    return currentNode
  }

  remove(data) {
    let childValueForParent = null;
    let findNode = this.find(data);

    if (findNode === null) {
      return true;
    }

    let parentNode = (findNode.parent === null) ? null : this.find(findNode.parent);
    let findNodeDirection = (parentNode && parentNode.rightChild && parentNode.rightChild.data === data) ? 'rightChild' : 'leftChild';
    let parentNodeData = parentNode ? parentNode.data : null;

    if (findNode.leftChild === null && findNode.rightChild === null) {
      childValueForParent = null;
    } else if (findNode.leftChild === null) {
      findNode.rightChild.parent = parentNodeData;
      childValueForParent = findNode.rightChild;
    } else if (findNode.rightChild === null) {
      findNode.leftChild.parent = parentNodeData;
      childValueForParent = findNode.leftChild;
    } else {
      let leftNode = findNode.leftChild;
      let rightNode = findNode.rightChild;
      this.currentNode = rightNode;
      let minValue = this.min();
      this.currentNode = null;

      if (minValue === null) {
        rightNode.leftChild = leftNode;
        leftNode.parent = rightNode.data;
      } else {
        let destinationNode = this.find(minValue);
        leftNode.parent = destinationNode.data;
        destinationNode.leftChild = leftNode;
      }

      rightNode.parent = parentNodeData;
      childValueForParent = rightNode;
    }

    if (parentNode) {
      parentNode[findNodeDirection] = childValueForParent;
    } else {
      this.nodes = childValueForParent;
    }

    return true;
  }

  min() {
    if (this.nodes === null) return null
    if (this.currentNode == null) this.currentNode = this.nodes
    while (this.currentNode.leftChild !== null) {
      this.currentNode = this.currentNode.leftChild
    }
    let result = this.currentNode.data
    this.currentNode = null
    return result
  }

  max() {
    if (this.nodes === null) return null
    if (this.currentNode == null) this.currentNode = this.nodes
    while (this.currentNode.rightChild !== null) {
      this.currentNode = this.currentNode.rightChild
    }
    let result = this.currentNode.data
    this.currentNode = null
    return result
  }
}

module.exports = {
  BinarySearchTree
};
