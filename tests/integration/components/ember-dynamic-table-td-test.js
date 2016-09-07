import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-td', 'Integration | Component | ember dynamic table td', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-table-td text='foo'}}`);
  assert.equal(this.$().text().trim(), 'foo');
});

test('Clicking on the ember-dynamic-table-td returns the id of the rows model', function(assert) {
  assert.expect(1);

  this.on('mockOnRowClick', function(id) {
    assert.equal(id, 5, 'Sort direction is correctly returned via the action');
  });

  this.render(hbs`{{ember-dynamic-table-td click=(action 'mockOnRowClick' 5)}}`);
  this.$('td').click();
});

test('Cursor style is of type pointer', function(assert) {
  this.render(hbs`{{ember-dynamic-table-td text='foo'}}`);
  var td = this.$('td');
  assert.ok(td.css('cursor') === 'pointer', 'element contains the \'cursor: pointer\' style');
});
