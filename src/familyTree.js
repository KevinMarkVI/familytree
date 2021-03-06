//Creates a Family Tree class build on the Tree class data structure

var FamilyTree = function(name) {
  this.tree = new Tree(name);
};

//Given a name, this function returns the grand parent node
FamilyTree.prototype.findGrandParent = function(name) {
  var grandParentNode;
  var targetNode = this.tree.findNode(name);
  if (targetNode.parent !== null && targetNode.parent.parent !== null) {
    grandParentNode = targetNode.parent.parent;
  } 
  return grandParentNode;
};

//Returns an array of nodes with no siblings
FamilyTree.prototype.noSiblings = function() {
  var results = [this.tree];
  var findOnlyChildren = function(node) {
    if (node.children.length === 1) {
      results.push(node.children[0]);
    }
  };
  this.tree.forEach(findOnlyChildren);
  return results;
};

//Returns an array of nodes with no children
FamilyTree.prototype.noChildren = function() {
  var results = [];
  var findNoChildren = function(node) {
    if (node.children.length === 0) {
      results.push(node);
    }
  };
  this.tree.forEach(findNoChildren);
  return results;
};

//Returns an object returning the number of grand children for any node that has grand children
FamilyTree.prototype.grandChildrenCount = function() {
  var grandChildrenCount = {};

  var findGrandChildren = function(node) {
    var grandParent = this.findGrandParent(node.value);
    if (grandParent) {
      if (grandChildrenCount[grandParent.value]) {
        grandChildrenCount[grandParent.value] += 1;
      } else {
        grandChildrenCount[grandParent.value] = 1;
      }
    }
  };
  this.tree.forEach(findGrandChildren.bind(this));
  return grandChildrenCount;
};

//Prints out an accurate representation of the family tree
FamilyTree.prototype.printTree = function() {
  var indent = '--'; 
  var result = indent + this.tree.value + '\n';
  
  var printNode = function(node, indent) {
      indent += '--';
    for (var i = 0; i < node.children.length; i++) {
      result += indent + ' ' + node.children[i].value + '\n';
      printNode(node.children[i], indent);
    }
  };
  printNode(this.tree, indent);
  return result;
};

