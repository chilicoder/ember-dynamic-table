import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-option-buttons', 'Integration | Component | ember dynamic table option buttons', {
  integration: true
});

test('The component renders', function(assert) {
  assert.expect(2);
  this.set('optionButtons', [{}]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
              optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  var $buttonOptions = this.$('span[class*=option-buttons]');
  assert.equal($buttonOptions.length, 1, 'button options render');
  var $button = $buttonOptions.find('button:eq(0)');
  assert.equal($button.length, 1, 'a button renders');
});

test('The color class is acknowledged by the button element', function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{ 'color': 'btn-red' }]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
              optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  var $button = this.$('span[class*=option-buttons]').find('button:eq(0)');
  assert.ok($button.hasClass('btn-red'), "The button element contains the 'btn-red' class");
}) ;

test("The icon class is acknowledged by the button's i element", function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{ 'icon': 'fa-trash' }]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
              optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  var $iElement = this.$('span[class*=option-buttons]').find('button:eq(0) i');
  assert.ok($iElement.hasClass('fa-trash'), "The button's <i> element contains the 'fa-trash' class");
});

test('The title property is acknowledged by the button element', function(assert) {
  assert.expect(1);
  let title = 'some title';
  this.set('optionButtons', [{ 'title': title }]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
              optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  assert.equal(this.$('button:eq(0)').prop('title'), title, "The title property is correctly passed to the button element's title attribute");
}) ;

test('If checkedItems array length > 0, buttons are visible', function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{}]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
              optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  assert.equal(this.$('span[class*=option-buttons]').length, 1, 'option buttons are rendered');
});

test('If checkedItems array is empty, buttons are not visible', function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{}]);
  this.set('checkedItems', []);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems
              optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  assert.notOk(this.$('span[class*=option-buttons]').hasClass('show'));
});

test('If checkedItems array length = 1, an optionButton with disableOnMulti = true is not disabled', function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{ 'disableOnMulti': true }]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
      optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  assert.notOk(this.$('button:eq(0)').attr('disabled'), 'Button does not contain the \'disabled\' class');
});

test('If checkedItems array length > 1, an optionButton with disableOnMulti = true is disabled', function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{ 'disableOnMulti': true }]);
  this.set('checkedItems', ['id1', 'id2']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
      optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  assert.ok(this.$('button:eq(0)').attr('disabled'), 'Button contains the \'disabled\' class');
});

test('If checkedItems array length = 1, an optionButton with disableOnMulti = false is not disabled', function(assert) {
  assert.expect(1);
  this.set('optionButtons', [{ 'disableOnMulti': false }]);
  this.set('checkedItems', ['id1']);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems 
      optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  assert.notOk(this.$('button:eq(0)').attr('disabled'), 'Button does not contain the \'disabled\' class');
});

test("When an optionButton is clicked, it sends it's actionId to the passed action", function(assert) {
  assert.expect(1);
  let actionId = 'edit';
  this.set('optionButtons', [{'actionId': actionId}]);
  this.set('checkedItems', ['id1']);
  this.set('mockOptionButtonClicked', (actual) => {
    assert.deepEqual(actual, actionId);
  });
  this.render(hbs `{{ember-dynamic-table-option-buttons checkedItems=checkedItems
      optionButtons=optionButtons buttonClicked=(action mockOptionButtonClicked)}}`);
  this.$('button:eq(0)').click();
});
