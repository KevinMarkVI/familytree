describe('Tree', function() {
  var tree;
  var count;

  beforeEach(function() {
    tree = new Tree(20);
    count = 0;
  });

  it('should have methods named "addChild", "contains", "removeChild", "childIndex", "findRoot", "findNode", and "forEach" and properties named "value" and "parent"', function() {
    expect(tree.addChild).to.be.a("function");
    expect(tree.contains).to.be.a("function");
    expect(tree.removeChild).to.be.a("function");
    expect(tree.childIndex).to.be.a("function");
    expect(tree.findRoot).to.be.a("function");
    expect(tree.findNode).to.be.a("function");
    expect(tree.forEach).to.be.a("function");
    expect(tree.hasOwnProperty("value")).to.equal(true);
    expect(tree.hasOwnProperty("parent")).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

 it('should not add children with duplicate values', function(){
    tree.addChild(5);
    expect(function () {tree.addChild(5);}).to.throw("This child already exists!");
    expect(function () {tree.children[0].addChild(20);}).to.throw("This child already exists!");
  });

 it('should designate the parent node', function(){
    tree.addChild(5);
    expect(tree.children[0].parent.value).to.equal(20);
  });

  it('should return true for a value that the tree contains', function(){
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return the correct index of a child', function(){
    tree.addChild(5);
    expect(tree.childIndex(5)).to.equal(0);
  });

  it('should return false for a value that was not added', function(){
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should remove children from the tree', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.removeChild(6);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should not allow removal of a node with children', function(){
    tree.addChild(5);
    tree.children[0].addChild(7);
    expect(function () {tree.removeChild(5);}).to.throw("You can not delete a node with children");
  });

  it('should correctly detect nested children', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
    expect(tree.contains(9)).to.equal(false);
  });

  it('should find and return a node given its value', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.findNode(7).parent.value).to.equal(5);
  });

  it('should call the iterator on each node in the tree', function(){
    var countNodes = function(node) {
      count++;
    };
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.forEach(countNodes);
    expect(count).to.equal(5);
  });

  it('should return the root node given any value', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.findRoot(7).value).to.equal(20);
  });



});

