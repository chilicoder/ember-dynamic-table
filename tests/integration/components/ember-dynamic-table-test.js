import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ember-ember-dynamic-table', 'Integration | Component | ember dynamic table', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(8);

  this.set('model', Ember.A([{'id':1, 'name':'Phil'}, {'id':2, 'name':'Ollie'}]));
  this.set('availableColumns', [{'title':'Name', 'property':'name', 'display':'plain'}]);
  this.set('sortProperties', Ember.A(['name']));
  this.on('mockOnRowClick', function() {});
  this.on('mockOptionButtonClicked', function() {});
  assert.ok(true);

  this.render(hbs`{{ember-dynamic-table 
    model=model
    availableColumns=availableColumns
    sortProperties=sortProperties 
    onRowClick=(action 'mockOnRowClick')
    optionButtonClicked=(action "mockOptionButtonClicked")
   }}`);

  assert.equal(this.$('input[name=filterBox]').length, 1, 'filterBox exists');
  assert.equal(this.$('table').length, 1, 'table exists');
  assert.equal(this.$('table thead tr th').length, 1, 'table headers exist');
  assert.equal(this.$('table thead tr th').text().trim(), 'Name', 'table header text is rendered');
  assert.equal(this.$('table tbody tr').length, 2, 'table rows exist');
  assert.equal(this.$('[class*=pageSize]').length, 1, 'pageSize component exists');
  assert.equal(this.$('[class*=pageIndex]').length, 1, 'pageIndex component exists');
});

test('Table responds to filterText input', function(assert) {
  assert.expect(2);

  this.set('model', Ember.A([{'id':1, 'name':'Phil'}, {'id':2, 'name':'Ollie'}]));
  this.set('availableColumns', [{'title':'Name', 'property':'name', 'display':'plain'}]);
  this.set('sortProperties', Ember.A(['name']));
  this.set('pageNumber', 0);
  this.set('pageSize', 10);
  this.set('filterText', '');
  this.set('filterableColumns', ['name']);
  this.on('mockOnRowClick', function() {});
  this.on('mockOptionButtonClicked', function() {});

  this.render(hbs`{{ember-dynamic-table 
    model=model
    availableColumns=availableColumns
    sortProperties=sortProperties 
    pageNumber=pageNumber 
    pageSize=pageSize 
    filterText=filterText
    filterableColumns=filterableColumns
    onRowClick=(action 'mockOnRowClick')
    optionButtonClicked=(action "mockOptionButtonClicked")
   }}`);

  assert.equal(this.$('table tbody tr').length, 2, 'Table displays 2 rows');
  this.set('filterText', 'phil');
  assert.equal(this.$('table tbody tr').length, 1, 'After (case insensitive) filtering, the table shows the correct number of rows');
});

test('Table rows are correctly divided by pageSize', function(assert) {
  assert.expect(2);

  this.set('model', Ember.A([
      {'id':1, 'name':'Phil'}, 
      {'id':2, 'name':'Ollie'},
      {'id':3, 'name':'Ollie'},
      {'id':4, 'name':'Ollie'},
      {'id':5, 'name':'Ollie'},
      {'id':6, 'name':'Ollie'},
      {'id':7, 'name':'Ollie'},
      {'id':8, 'name':'Ollie'},
      {'id':9, 'name':'Ollie'},
      {'id':10, 'name':'Ollie'}
  ]));
  this.set('sortProperties', Ember.A(['name']));
  this.set('availableColumns', [{'title':'Name', 'property':'name', 'filterable':true, 'display':'plain'}]);
  this.set('pageNumber', 0);
  this.set('pageSize', 5);
  this.on('mockOnRowClick', function() {});
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table 
    model=model
    availableColumns=availableColumns
    sortProperties=sortProperties 
    pageNumber=pageNumber 
    pageSize=pageSize 
    onRowClick=(action 'mockOnRowClick')
    optionButtonClicked=(action "mockOptionButtonClicked")
   }}`);

  assert.equal(this.$('table tbody tr').length, 5, 'Table displays 5 rows');
  this.set('pageSize', 7);
  assert.equal(this.$('table tbody tr').length, 7, 'Table displays 7 rows');
});

test('Clicking the header sorts the table rows accordingly', function(assert) {
  assert.expect(5);

  this.set('model', Ember.A([{'id':1, 'name':'Phil'}, {'id':2, 'name':'Ollie'}]));
  this.set('availableColumns', [{'title':'Name', 'property':'name', 'filterable':true, 'display':'plain'}]);
  this.set('sortProperties', Ember.A(['name']));
  this.on('mockOnRowClick', function() {});
  this.on('mockOptionButtonClicked', function() {});

  this.render(hbs`{{ember-dynamic-table 
    model=model
    availableColumns=availableColumns
    sortProperties=sortProperties 
    onRowClick=(action 'mockOnRowClick')
    optionButtonClicked=(action "mockOptionButtonClicked")
   }}`);

  assert.equal(this.$('table thead tr th:eq(0)').text().trim(), 'Name', 'Name column header is correctly displayed');
  assert.equal(this.$('table tbody tr').length, 2, 'Table displays correct number of rows');
  assert.equal(this.$('table tbody tr:eq(0) td:eq(0)').text().trim(), 'Ollie', 'Table results are sorted Asc');
  var $headerToClick = this.$('table thead th:eq(0)');
  assert.equal($headerToClick.length, 1, 'header to click renders');
  $headerToClick.click();
  assert.equal(this.$('table tbody tr:eq(0) td:eq(0)').text().trim(), 'Phil', 'Table results are now sorted Dsc');
});

test('The table shows the correct set of rows according to the page pagination', function(assert) {
  assert.expect(3);

  this.set('model', Ember.A([
      {'id':1, 'name':'Aa'}, 
      {'id':2, 'name':'Bb'},
      {'id':3, 'name':'Cc'},
      {'id':4, 'name':'Dd'},
      {'id':5, 'name':'Ee'},
      {'id':6, 'name':'Ff'}
  ]));
  this.set('availableColumns', [{'title':'Name', 'property':'name', 'display':'plain'}]);
  this.set('sortProperties', Ember.A(['name']));
  this.set('pageNumber', 1);
  this.set('pageSize', 2);
  this.on('mockOnRowClick', function() {});
  this.on('mockOptionButtonClicked', function() {});

  this.render(hbs`{{ember-dynamic-table 
    model=model
    availableColumns=availableColumns
    sortProperties=sortProperties 
    pageNumber=pageNumber 
    pageSize=pageSize 
    onRowClick=(action 'mockOnRowClick')
    optionButtonClicked=(action "mockOptionButtonClicked")
   }}`);

  assert.equal(this.$('[class*=pageIndex] button').length, 5, 'Pagination index displays correct number of buttons');
  assert.equal(this.$('[class*=pageIndex] button:eq(4)').text().trim(), 'Next', 'The last button is the \'Next\' option');
  assert.equal(this.$('table tbody tr:eq(0) td:eq(0)').text().trim(), 'Cc');
});
