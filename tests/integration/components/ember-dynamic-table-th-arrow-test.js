import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-th-arrow', 'Integration | Component | ember dynamic table th arrow', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=true}}`);

  var $i = this.$('i');
  assert.equal($i.length, 1, 'it exists');
});

test('Element includes the class \'fa\'', function(assert) {
  assert.expect(1);

  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property}}`);

  var $element = this.$('i');
  assert.ok($element.hasClass('fa'), 'element contains the "fa" class');
});

test('While not hovered over, if the passed-in values for sortProperties and property are not equal, direction arrow is not visible', function(assert) {
  assert.expect(2);

  this.set('sortProperties', ['foo']);
  this.set('property', 'bar');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=false}}`);

  var $element = this.$('i');
  assert.equal($element.length, 1, 'element is rendered');
  assert.ok($element.hasClass('hide'), 'element contains the \'hide\' class');
});

test('While not hovered over, if the passed-in values for sortProperties and property are equal, direction arrow is visible', function(assert) {
  assert.expect(2);

  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=false}}`);

  var $element = this.$('i');
  assert.equal($element.length, 1, 'element is rendered');
  assert.notOk($element.hasClass('hide'), 'element does not contain the \'hide\' class');
});

test('While hovered over, if the passed-in values for sortProperties and property are not equal, direction arrow is visible and gray', function(assert) {
  assert.expect(3);

  this.set('sortProperties', ['foo']);
  this.set('property', 'bar');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=true}}`);

  var $element = this.$('i');
  assert.equal($element.length, 1, 'element renders');
  assert.notOk($element.hasClass('hide'), 'element does not contain the \'hide\' class');
  assert.ok($element.hasClass('gray-dark'), 'element contains the \'gray-dark\' class');
});

test('While hovered over, if the passed-in values for sortProperties and property are equal, direction arrow is visible and not gray', function(assert) {
  assert.expect(2);
  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=true}}`);

  var $element = this.$('i');
  assert.notOk($element.hasClass('hide'), 'element does not contain the \'hide\' class');
  assert.notOk($element.hasClass('LightGray'), 'element does not contain the \'LightGray\' class');
});

test('If the passed-in value for sortProperties does not contain :desc, direction arrow is points down', function(assert) {
  assert.expect(1);
  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=true}}`);

  var $element = this.$('i');
  assert.ok($element.hasClass('fa-long-arrow-down'), 'element contains the \'fa-long-arrow-down\' class');
});

test('If the passed-in value for sortProperties contains :desc, direction arrow is points up', function(assert) {
  assert.expect(1);
  this.set('sortProperties', ['foo:desc']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th-arrow sortProperties=sortProperties property=property hover=true}}`);

  var $element = this.$('i');
  assert.ok($element.hasClass('fa-long-arrow-up'), 'element contains the \'fa-long-arrow-up\' class');
});
