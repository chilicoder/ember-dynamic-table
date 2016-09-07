import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-ember-dynamic-table-pagination-size', 'Integration | Component | ember dynamic table pagination size', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ember-dynamic-table-pagination-size}}`);
  var select = this.$('[class*=pageSize] select');
  assert.equal(select.length, 1, 'it exists');
});

test('The select list renders an option for each of the values in the pageSizeOption array', function(assert) {
  assert.expect(5);

  this.set('pageSizeOptions', [10, 25, 50, 100]);
  this.render(hbs`{{ember-dynamic-table-pagination-size pageSizeOptions=pageSizeOptions}}`);

  var selectOptions = this.$('[class*=pageSize] select option');
  assert.equal(selectOptions.length, 4, 'it exists');
  assert.equal(selectOptions.eq(0).text().trim(), '10', '10 is correctly displayed');
  assert.equal(selectOptions.eq(1).text().trim(), '25', '25 is correctly displayed');
  assert.equal(selectOptions.eq(2).text().trim(), '50', '50 is correctly displayed');
  assert.equal(selectOptions.eq(3).text().trim(), '100', '100 is correctly displayed');
});

test('The span text displays \'Rows per page:\'', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ember-dynamic-table-pagination-size}}`);

  var pageIndex = this.$('[class*=pageSize] span');
  assert.equal(pageIndex.text().trim(), 'Rows per page:', 'The correct span text is displayed');
});

test('When a new pageSize is selected the new size is sent up through the setPageSize action', function(assert) {
  assert.expect(2);

  this.set('pageSize', 10);
  this.set('pageSizeOptions', [10, 25, 50, 100]);

  this.on('mockSetPageSize', function(sortProperties) {
    assert.equal(sortProperties, 50, 'Sort direction is correctly returned via the action');
  });

  this.render(hbs`{{ember-dynamic-table-pagination-size pageSize=pageSize pageSizeOptions=pageSizeOptions onPageSizeChange=(action 'mockSetPageSize')}}`);

  assert.equal(this.$('[class*=pageSize] select option').length, 4, '4 select options were found');
  //assert.equal(this.$('div[class*=pageSize] select option:eq(0)').is(':selected'));

  this.$('[class*=pageSize] select option:eq(2)').prop('selected', true).trigger('change');
});
