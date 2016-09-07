import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ember-dynamic-ember-dynamic-table-footer-td', 'Integration | Component | ember dynamic table footer td', {
  integration: true
});

var filteredContentJson = [
  { 'id':0, 'units':2 },
  { 'id':1, 'units':3 },
  { 'id':2, 'units':1 },
  { 'id':3, 'units':4 }
];

// Map must be of type Ember.ObjectProxy as the compenent iterates through this.get('property'), not the standard JS this.property.
var FILTERED_CONTENT = filteredContentJson.map(function(obj) {
  return Ember.ObjectProxy.create({
    content: obj
  });
});

test('When the propertiesMap value is set as true, the total of all the values is correctly displayed', function(assert) {
  assert.expect(3);

  this.set('property', 'units');
  this.set('propertiesMap', new Map([["units", true]]));
  this.set('filteredContent', FILTERED_CONTENT);
  this.set('format', {'type':'number', 'options':[0]});
  this.render(hbs`{{ember-dynamic-table-footer-td property=property propertiesMap=propertiesMap filteredContent=filteredContent format=format}}`);

  var td = this.$('td');
  assert.equal(td.length, 1, 'it exists');
  assert.equal(FILTERED_CONTENT.length, 4);
  assert.equal(td.text().trim(), 10);
});

test('When the propertiesMap value is set as a caluclation array, the total of all the values is correctly displayed', function(assert) {
  assert.expect(3);

  this.set('property', 'units');
  this.set('propertiesMap', new Map([["units", ["units", "divide", 2]]]));
  this.set('filteredContent', FILTERED_CONTENT);
  this.set('format', {'type':'number', 'options':[0]});
  this.render(hbs`{{ember-dynamic-table-footer-td property=property propertiesMap=propertiesMap filteredContent=filteredContent format=format}}`);

  var td = this.$('td');
  assert.equal(td.length, 1, 'it exists');
  assert.equal(FILTERED_CONTENT.length, 4);
  assert.equal(td.text().trim(), 5);
});
