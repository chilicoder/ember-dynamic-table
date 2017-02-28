import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-th', 'Integration | Component | ember dynamic table th', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-table-th}}`);
  assert.equal(this.$('th').length, 1, 'the <th> is rendered');
});

test('If sortProperty === property, :desc is added to the current sortProperty value', function(assert) {
  assert.expect(1);
  this.set('property', 'foo');
  this.set('sortProperty', ['foo']);
  this.set('mockSortByChange', sortProperty => {
    assert.equal(sortProperty, 'foo:desc', 'Sort direction is correctly returned via the action');
  });
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property 
              onSortByChange=(action mockSortByChange)}}`);
  this.$('th').click();
});

test('If sortProperty !== property, sortProperty is updated to the new property', function(assert) {
  assert.expect(1);
  this.set('property', 'bar');
  this.set('sortProperty', ['foo']);
  this.set('mockSortByChange', sortProperty => {
    assert.equal(sortProperty, 'bar', 'Sort direction is correctly returned via the action');
  });
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property 
              onSortByChange=(action mockSortByChange)}}`);
  this.$('th').click();
});

test('When hovered over the element, mouse cursor style is changed to pointer', function(assert) {
  this.render(hbs`{{ember-dynamic-table-th}}`);
  var $th = this.$('th');
  assert.ok($th.css('cursor') === 'pointer', "element contains the 'cursor: pointer' style");
});

test('Title is correctly displayed.', function(assert) {
  this.render(hbs`{{ember-dynamic-table-th title="foobar"}}`);
  assert.equal(this.$('th').text().trim(), 'foobar');
});

test('If sortProperty !== property, the <i> is not rendered', function(assert) {
  assert.expect(1);
  this.set('property', 'bar');
  this.set('sortProperty', ['foo']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property isHover=false}}`);
  assert.notEqual(this.$('th i').length, 1);
});

test('If sortProperty === property & isHover = false, the <i> is rendered', function(assert) {
  assert.expect(1);
  this.set('property', 'foo');
  
  this.set('sortProperty', ['foo']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property isHover=false}}`);
  assert.ok(this.$('th i').length, 1);
});

test('The <i> element includes the fa class', function(assert) {
  assert.expect(1);
  this.set('property', 'foo');
  
  this.set('sortProperty', ['foo']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property}}`);
  assert.ok(this.$('i').hasClass('fa'), 'element contains the "fa" class');
});

test('If isHover = true, the <i> contains the is-isHover class', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-table-th isHover=true}}`);
  assert.ok(this.$('i').hasClass('is-hover'));
});

test('If isHover = false, the <i> contains the is-isHover class', function(assert) {
  assert.expect(1);
  this.set('property', 'foo');
  
  this.set('sortProperty', ['foo']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property isHover=false}}`);
  assert.notOk(this.$('i').hasClass('is-hover'));
});

test('If sortProperty === property & sortProperty does not contain :desc, <i> has the fa-long-arrow-down class', function(assert) {
  assert.expect(1);
  this.set('property', 'foo');
  
  this.set('sortProperty', ['foo']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property}}`);
  assert.ok(this.$('i').hasClass('fa-long-arrow-down'));
});

test('If sortProperty === property & sortProperty contains :desc, <i> has the fa-long-arrow-up class', function(assert) {
  this.set('property', 'foo');
  
  this.set('sortProperty', ['foo:desc']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property}}`);
  assert.ok(this.$('i').hasClass('fa-long-arrow-up'));
});

test('If sortProperty !== property & sortProperty contains :desc, & isHover = true, <i> has the fa-long-arrow-down class', function(assert) {
  this.set('property', 'bar');
  this.set('sortProperty', ['foo:desc']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property isHover=true}}`);
  assert.ok(this.$('i').hasClass('fa-long-arrow-down'));
});

test('If sortProperty !== property & sortProperty does not contain :desc, & isHover = true, <i> has the fa-long-arrow-down class', function(assert) {
  this.set('property', 'bar');
  this.set('sortProperty', ['foo']);
  this.render(hbs`{{ember-dynamic-table-th sortProperty=sortProperty property=property isHover=true}}`);
  assert.ok(this.$('i').hasClass('fa-long-arrow-down'));
});
