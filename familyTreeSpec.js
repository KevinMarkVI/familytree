 describe('Family Tree', function() {
  var familyTree;

  beforeEach(function() {
    familyTree = new FamilyTree('John');
  });

    it('should have methods named "findGrandParent", "noSiblings", "noChildren" and "grandChildrenCount', function() {
    expect(familyTree.findGrandParent).to.be.a("function");
    expect(familyTree.noSiblings).to.be.a("function");
    expect(familyTree.noChildren).to.be.a("function");
    expect(familyTree.grandChildrenCount).to.be.a("function");
  });

  it('should return all nodes without siblings', function() {
    familyTree.tree.addChild('Ken');
    familyTree.tree.children[0].addChild('Trevor');
    familyTree.tree.children[0].addChild('Kevin');
    familyTree.tree.children[0].children[1].addChild('Butters');
    var arr = familyTree.noSiblings();
    expect(arr[0].value).to.equal('John');
    expect(arr[1].value).to.equal('Ken');
    expect(arr[2].value).to.equal('Butters');
  });

  it('should return all nodes without children', function() {
    familyTree.tree.addChild('Ken');
    familyTree.tree.children[0].addChild('Trevor');
    familyTree.tree.children[0].addChild('Kevin');
    familyTree.tree.children[0].children[1].addChild('Butters');
    var arr = familyTree.noChildren();
    expect(arr[0].value).to.equal('Butters');
    expect(arr[1].value).to.equal('Trevor');
  });

  it('should return the node of the grand parent when given the grand child\'s name', function() {
    familyTree.tree.addChild('Ken');
    familyTree.tree.children[0].addChild('Trevor');
    familyTree.tree.children[0].addChild('Kevin');
    familyTree.tree.children[0].children[1].addChild('Butters');
    familyTree.tree.children[0].children[1].children[0].addChild('Toy');
    expect(familyTree.findGrandParent('Toy').value).to.equal('Kevin');
  });

  it('should return an object containing the number of grand children for each person that has grand children', function() {
    familyTree.tree.addChild('Ken');
    familyTree.tree.children[0].addChild('Trevor');
    familyTree.tree.children[0].addChild('Kevin');
    familyTree.tree.children[0].children[0].addChild('1');
    familyTree.tree.children[0].children[0].addChild('2');
    familyTree.tree.children[0].children[0].addChild('3');
    familyTree.tree.children[0].children[1].addChild('Butters');
    familyTree.tree.children[0].children[1].children[0].addChild('Toy');
    var obj = familyTree.grandChildrenCount();
    expect(Object.keys(obj).length).to.equal(3);
    expect(obj.Ken).to.equal(4);
  });

  it('should print out an accurate representation of the family tree', function() {
    familyTree.tree.addChild('Ken');
    familyTree.tree.children[0].addChild('Trevor');
    familyTree.tree.children[0].addChild('Kevin');
    familyTree.tree.children[0].children[0].addChild('1');
    familyTree.tree.children[0].children[0].addChild('2');
    familyTree.tree.children[0].children[0].addChild('3');
    familyTree.tree.children[0].children[1].addChild('Butters');
    familyTree.tree.children[0].children[1].children[0].addChild('Toy');
    expect(familyTree.printTree()).to.equal("--John\n---- Ken\n------ Trevor\n-------- 1\n-------- 2\n-------- 3\n------ Kevin\n-------- Butters\n---------- Toy\n");
  });

});

