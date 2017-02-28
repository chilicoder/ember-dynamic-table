import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-header-tr', 'Integration | Component | ember dynamic table header tr', {
  integration: true
});

test('if numOptionButtons is > 0, checkbox th is rendered', function(assert) {
  assert.expect(1);
  this.set('numOptionButtons', 1);
  this.render(hbs`{{ember-dynamic-table-header-tr numOptionButtons=numOptionButtons}}`);
  assert.equal(this.$('.checkbox-th').length, 1);
});

test('if numOptionButtons is < 1, checkbox th is not rendered', function(assert) {
  assert.expect(1);
  this.set('numOptionButtons', 0);
  this.render(hbs`{{ember-dynamic-table-header-tr numOptionButtons=numOptionButtons}}`);
  assert.equal(this.$('.checkbox-th').length, 0);
});

test('if numOptionButtons is null, checkbox th is not rendered', function(assert) {
  assert.expect(1);
  this.set('numOptionButtons', null);
  this.render(hbs`{{ember-dynamic-table-header-tr numOptionButtons=numOptionButtons}}`);
  assert.equal(this.$('.checkbox-th').length, 0);
});
