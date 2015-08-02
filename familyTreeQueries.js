//Class that returns specific queries of a Family Tree

var FamilyTreeQuery = function(name) {
  this.familyTree = new FamilyTree(name);
};

//Given a name, this function returns the name of that persons grand parent
FamilyTreeQuery.prototype.grandParentName = function(grandChildName) {
  var gpNode = this.familyTree.findGrandParent(grandChildName);
  console.log(gpNode.value);
  return gpNode.value;
};

//Returns the names of all the people that have no siblings
FamilyTreeQuery.prototype.findOnlyChildren = function() {
  var results = [];
  var noSibArr = this.familyTree.noSiblings();
  for (var i = 0; i < noSibArr.length; i++ ) {
    results.push(noSibArr[i].value);
  }
  console.log(results.join(','));
  return results.join(',');
};

//Returns the names of all the people that have no children
FamilyTreeQuery.prototype.findNoChildren = function() {
  var results = [];
  var noChildArray = this.familyTree.noChildren();
  for (var i = 0; i < noChildArray.length; i++ ) {
    results.push(noChildArray[i].value);
  }
  console.log(results.join(','));
  return results.join(',');
};

//Returns the name of the person with the most grand children
FamilyTreeQuery.prototype.mostGrandChildren = function() {
  var maxGrandChildren = 0;
  var maxGrandParent;
  var grandChildCountObj= this.familyTree.grandChildrenCount();
  for (var key in grandChildCountObj) {
    if (grandChildCountObj[key] > maxGrandChildren) {
      maxGrandChildren = grandChildCountObj[key];
      maxGrandParent = key;
    }
  }
  console.log(maxGrandParent);
  return maxGrandParent;
};

//Returns 
FamilyTreeQuery.prototype.displayFamilyTree = function() {
  var displayedTree = this.familyTree.printTree();
  console.log(displayedTree);
  return displayedTree;
};

