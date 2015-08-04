//Creates a tree data structure and relevant methods

//Creates inital Tree node with the given value
var Tree = function(value){
  this.value = value;
  this.children = [];
  this.parent = null;
};

//Creates a child and adds it to the parent node
Tree.prototype.addChild = function(value){
  var child;
  var treeRoot = this.findRoot(); 
  if (treeRoot.contains(value)) {
    throw new Error("This child already exists!");
  } else {
    child = new Tree(value);
    child.parent = this;
    this.children.push(child);
  }
  return child;
};

//Removes immediate child node of this node that's value matches the passed in value
Tree.prototype.removeChild = function(value){
  var removedChild;
  var index = this.childIndex(value);
  if (index !== -1) {
    if (this.children[index].children.length > 0) {
      throw new Error("You can not delete a node with children");
    } else { 
      removedChild = this.children.splice(index, 1);
    }
  } else {
    throw new Error("This child does not exist!");
  }
  return removedChild;
};

//Returns the index of a node within the children array of the parent node
Tree.prototype.childIndex = function(value) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].value === value) {
      return i;
    }
  }
  return -1;
};

//Returns true if the node is contained within the tree
Tree.prototype.contains = function(value){
  if (this.findNode(value)) {
    return true;
  } else {
    return false;
  }
};

//Finds and returns a node in tree 
Tree.prototype.findNode = function(value) {
  var result;
  var nodeFinder = function(node) {
    if (node.value === value) {
      result = node;
    }
  };
  this.forEach(nodeFinder);
  return result;
};

//Calls an iterator on each node in the tree
Tree.prototype.forEach = function(iterator) {
  var nodeArr = [this];
  while (nodeArr.length) {
    var node = nodeArr.pop();
    iterator(node);
    for (var i = 0; i < node.children.length; i++) {
      nodeArr.push(node.children[i]);
    }
  }
};

//Returns the root node of the tree given any value
Tree.prototype.findRoot = function() {
  var currentNode = this;
  while (currentNode.parent) {
    currentNode = currentNode.parent;
  }
  return currentNode;
};



