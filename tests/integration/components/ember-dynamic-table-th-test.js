import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-th', 'Integration | Component | ember dynamic table th', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.render(hbs`{{ember-dynamic-table-th sortProperties=sortProperties property=property}}`);

  var $th = this.$('th');
  assert.equal($th.length, 1, 'it exists');
});

test('When the passed-in values for sortProperties and property are equal, the component adds :desc to the current sortProperties value', function(assert) {
  assert.expect(1);

  this.set('sortProperties', ['foo']);
  this.set('property', 'foo');
  this.on('mockSortByChange', function(sortProperties) {
    assert.equal(sortProperties, 'foo:desc', 'Sort direction is correctly returned via the action');
  });

  this.render(hbs`{{#ember-dynamic-table-th sortProperties=sortProperties property=property onSortByChange=(action 'mockSortByChange')}}Name{{/ember-dynamic-table-th}}`);

  this.$('th').click();
});

test('When the passed-in values for sortProperties and property are not equal, the component updates the sortProperties value to the new property', function(assert) {
  assert.expect(1);

  this.set('sortProperties', ['foo']);
  this.set('property', 'bar');
  this.on('mockSortByChange', function(sortProperties) {
    assert.equal(sortProperties, 'bar', 'Sort direction is correctly returned via the action');
  });

  this.render(hbs`{{#ember-dynamic-table-th sortProperties=sortProperties property=property onSortByChange=(action 'mockSortByChange')}}Name{{/ember-dynamic-table-th}}`);

  this.$('th').click();
});

test('When hovered over the element, mouse cursor style is changed to pointer', function(assert) {
  this.render(hbs`{{ember-dynamic-table-th sortProperties='whatever'}}`);
  var $th = this.$('th');
  assert.ok($th.css('cursor') === 'pointer', 'element contains the \'cursor: pointer\' style');
});

test('The foo for the header is correctly displayed.', function(assert) {
  this.render(hbs`{{#ember-dynamic-table-th sortProperties='fooBar'}}Name{{/ember-dynamic-table-th}}`);
  assert.equal(this.$('th').text().trim(), 'Name', 'Header text \'foo\' is correctly displayed');
});
