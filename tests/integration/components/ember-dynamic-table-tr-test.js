import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ember-dynamic-table-tr', 'Integration | Component | ember dynamic table tr', {
  integration: true
});

test('it exists', function(assert){
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=1 }}`);
  assert.equal(this.$('tr').length, 1, 'row exists');
});

test('If numOptionButtons > 0, checkbox column is rendered', function(assert) {
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.equal(this.$('.checkbox-td').length, 1);
});

test('If numOptionButtons = 0, checkbox column is not rendered', function(assert) {
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 0);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.notEqual(this.$('.checkbox-td').length, 1);
});

test('If numOptionButtons = null, checkbox column is not rendered', function(assert) {
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', null);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.notEqual(this.$('.checkbox-td').length, 1);
});

test('If checkbox is clicked, it becomes checked', function(assert) {
  assert.expect(2);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.set('mockAction', () => {});
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons 
              onCheckedChange=(action mockAction)}}`);
  const $checkbox = this.$('.checkbox-td input[type="checkbox"]');
  assert.notOk($checkbox.is(':checked'), 'checkbox is not already checked');
  $checkbox.click();
  assert.ok($checkbox.is(':checked'), 'checkbox is checked');
});

test("If checkbox is ticked, the 'highlighted' class is added to the row", function(assert) {
  assert.expect(2);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.set('mockAction', () => {
    Ember.run(() => {
      Ember.set(row, 'checked', true);
    });
  });

  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons 
              onCheckedChange=(action mockAction)}}`);
  const $checkbox = this.$('.checkbox-td input[type="checkbox"]');
  $checkbox.click();
  assert.ok($checkbox.is(':checked'), 'checkbox is checked');
  assert.ok(this.$('tr').eq(0).hasClass('highlighted'), "tr contains the 'highlighted' class");
});

test('if the numOptionButtons array length is = 0, the checkbox td is not displayed', function(assert) {
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 0);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.equal(this.$('.checkbox-td').length, 0, 'checkbox td is not rendered');
});

test('if the numOptionButtons array length is > 0, the checkbox td is displayed', function(assert) {
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.equal(this.$('.checkbox-td').length, 1, 'checkbox td is not rendered');
});

test('if the row does not contain an isBold property, the row is not displayed in bold', function(assert) {
  assert.expect(1);
  const row = Ember.Object.create({ id: 0, name: 'foobar' });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.notOk(this.$('tr').css('font-weight') === '700');
});

test('if the row contains an isBold property that is set to true, the row is displayed in bold', function(assert) {
  assert.expect(1);
  var row = Ember.Object.create({ id:0, name:'FixOrg0', isBold: true });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.ok(this.$('tr').css('font-weight') === 'bold');
});

test('cursor style is pointer', function(assert) {
  assert.expect(1);
  var row = Ember.Object.create({ id:0, name:'FixOrg0', isBold: true });
  this.set('row', row);
  this.set('numOptionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-tr row=row numOptionButtons=numOptionButtons}}`);
  assert.ok(this.$('tr').css('cursor') === 'pointer', 'element contains the \'cursor: pointer\' style');
});
