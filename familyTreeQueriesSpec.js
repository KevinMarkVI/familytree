 describe('Family Tree Queries', function() {
  var familyTreeQuery;

  beforeEach(function() {
    familyTreeQuery = new FamilyTreeQuery('John');
  });

  it('should have methods named "grandParentName", "findOnlyChildren", "findNoChildren" and "mostGrandChildren', function() {
    expect(familyTreeQuery.grandParentName).to.be.a("function");
    expect(familyTreeQuery.findOnlyChildren).to.be.a("function");
    expect(familyTreeQuery.findNoChildren).to.be.a("function");
    expect(familyTreeQuery.mostGrandChildren).to.be.a("function");
  });

  it('should return the names of all nodes without siblings', function() {
    familyTreeQuery.familyTree.tree.addChild('Ken');
    familyTreeQuery.familyTree.tree.children[0].addChild('Trevor');
    familyTreeQuery.familyTree.tree.children[0].addChild('Kevin');
    familyTreeQuery.familyTree.tree.children[0].children[1].addChild('Butters');
    expect(familyTreeQuery.findOnlyChildren()).to.equal('John,Ken,Butters');
  });

  it('should return the names of all nodes without children', function() {
    familyTreeQuery.familyTree.tree.addChild('Ken');
    familyTreeQuery.familyTree.tree.children[0].addChild('Trevor');
    familyTreeQuery.familyTree.tree.children[0].addChild('Kevin');
    familyTreeQuery.familyTree.tree.children[0].children[1].addChild('Butters');
    expect(familyTreeQuery.findNoChildren()).to.equal('Butters,Trevor');
  });

  it('should return the name of the grand parent when given the grand child\'s name', function() {
    familyTreeQuery.familyTree.tree.addChild('Ken');
    familyTreeQuery.familyTree.tree.children[0].addChild('Trevor');
    familyTreeQuery.familyTree.tree.children[0].addChild('Kevin');
    familyTreeQuery.familyTree.tree.children[0].children[1].addChild('Butters');
    familyTreeQuery.familyTree.tree.children[0].children[1].children[0].addChild('Toy');
    expect(familyTreeQuery.grandParentName('Toy')).to.equal('Kevin');
  });

  it('should return the name of the grand parent with the most grand children', function() {
    familyTreeQuery.familyTree.tree.addChild('Ken');
    familyTreeQuery.familyTree.tree.children[0].addChild('Trevor');
    familyTreeQuery.familyTree.tree.children[0].addChild('Kevin');
    familyTreeQuery.familyTree.tree.children[0].children[0].addChild('1');
    familyTreeQuery.familyTree.tree.children[0].children[0].addChild('2');
    familyTreeQuery.familyTree.tree.children[0].children[0].addChild('3');
    familyTreeQuery.familyTree.tree.children[0].children[1].addChild('Butters');
    familyTreeQuery.familyTree.tree.children[0].children[1].children[0].addChild('Toy');
    expect(familyTreeQuery.mostGrandChildren()).to.equal('Ken');
  });

  it('should print out an accurate representation of the family tree', function() {
    familyTreeQuery.familyTree.tree.addChild('Ken');
    familyTreeQuery.familyTree.tree.children[0].addChild('Trevor');
    familyTreeQuery.familyTree.tree.children[0].addChild('Kevin');
    familyTreeQuery.familyTree.tree.children[0].children[0].addChild('1');
    familyTreeQuery.familyTree.tree.children[0].children[0].addChild('2');
    familyTreeQuery.familyTree.tree.children[0].children[0].addChild('3');
    familyTreeQuery.familyTree.tree.children[0].children[1].addChild('Butters');
    familyTreeQuery.familyTree.tree.children[0].children[1].children[0].addChild('Toy');
    expect(familyTreeQuery.displayFamilyTree()).to.equal("--John\n---- Ken\n------ Trevor\n-------- 1\n-------- 2\n-------- 3\n------ Kevin\n-------- Butters\n---------- Toy\n");
  });

});

