import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-footer-tr', 'Integration | Component | ember dynamic table footer tr', {
  integration: true
});

test('if the optionButtons array length is < 1, the checkbox tfoot td is not displayed', function(assert) {
  assert.expect(1);

  this.set('optionButtons', 0);
  this.render(hbs`{{ember-dynamic-table-footer-tr optionButtons=optionButtons}}`);

  var th = this.$('tr td#checkboxTfootTd');
  assert.equal(th.length, 0, 'checkbox th is not rendered');
});

test('if the optionButtons array length is > 0, the checkbox tfoot td is displayed', function(assert) {
  assert.expect(1);

  this.set('optionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-footer-tr optionButtons=optionButtons}}`);

  var th = this.$('tr td#checkboxTfootTd');
  assert.equal(th.length, 1, 'th exists');
});
