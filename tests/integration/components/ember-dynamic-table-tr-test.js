import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ember-dynamic-table-tr', 'Integration | Component | ember dynamic table tr', {
  integration: true
});

var MODEL = Ember.Object.create({ 
  id:0, 
  name:'FixOrg0'
});

test('checkbox exists', function(assert){
  assert.expect(1);

  this.set('model', MODEL);
  this.on('mockToggleCheckedProperty', function() { });

  this.render(hbs`{{ember-dynamic-table-tr model=model optionButtons=1 onCheckedChange=(action "mockToggleCheckedProperty")}}`);
  var $checkbox = this.$('tr td[id=checkboxTd] input[type="checkbox"]');
  assert.equal($checkbox.length, 1, 'checkbox exists');
});

test('When checkbox is ticked, the row becomes highlighted', function(assert) {
  assert.expect(5);

  this.on('mockToggleCheckedProperty', function() {
    Ember.run(function(){
      Ember.set(MODEL, 'checked', true);
    });
  });

  this.set('model', MODEL);
  this.render(hbs`{{ember-dynamic-table-tr model=model optionButtons=1 onCheckedChange=(action "mockToggleCheckedProperty")}}`);

  var $tr = this.$('tr');
  assert.equal($tr.length, 1, 'row exists');

  var $checkbox = this.$('tr td[id=checkboxTd] input[type="checkbox"]');
  assert.equal($checkbox.length, 1, 'checkbox exists');

  assert.notOk($checkbox.is(':checked'), 'checkbox is not already checked');
  $checkbox.click();
  assert.ok($checkbox.is(':checked'), 'checkbox is checked');

  assert.ok($tr.eq(0).hasClass('highlighted'), 'tr contains the "highlighted" class');
});

test('if the optionButtons array length is < 1, the checkbox td is not displayed', function(assert) {
  assert.expect(1);

  this.set('model', MODEL);
  this.set('optionButtons', 0);
  this.render(hbs`{{ember-dynamic-table-tr model=model optionButtons=optionButtons}}`);

  var checkboxTd = this.$('tr td[id=checkboxTd]');
  assert.equal(checkboxTd.length, 0, 'checkbox td is not rendered');
});

test('if the optionButtons array length is > 0, the checkbox td is displayed', function(assert) {
  assert.expect(1);

  this.set('model', MODEL);
  this.set('optionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-tr model=model optionButtons=optionButtons}}`);

  var checkboxTd = this.$('tr td[id=checkboxTd]');
  assert.equal(checkboxTd.length, 1, 'td exists');
});

test('if the model does not contain an isBold property, the row is not displayed in bold', function(assert) {
  assert.expect(1);

  var model = Ember.Object.create({ 
    id:0, 
    name:'FixOrg0',
  });

  this.on('mockToggleCheckedProperty', function() {});
  this.set('model', model);
  this.render(hbs`{{ember-dynamic-table-tr model=model onCheckedChange=(action "mockToggleCheckedProperty")}}`);
  assert.notOk(this.$('tr').css('font-weight') === '700');
});

test('if the model contains an isBold property that is set to true, the row is displayed in bold', function(assert) {
  assert.expect(1);

  var model = Ember.Object.create({ 
    id:0, 
    name:'FixOrg0',
    isBold: true
  });

  this.on('mockToggleCheckedProperty', function() {});
  this.set('model', model);
  this.render(hbs`{{ember-dynamic-table-tr model=model onCheckedChange=(action "mockToggleCheckedProperty")}}`);
  assert.ok(this.$('tr').css('font-weight') === 'bold');
});
