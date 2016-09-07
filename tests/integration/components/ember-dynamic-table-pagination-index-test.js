import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-ember-dynamic-table-pagination-index', 'Integration | Component | ember dynamic table pagination index', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.set('pages', [1, 2, 3]);
  this.render(hbs`{{ember-dynamic-table-pagination-index model=pages}}`);

  var component = this.$('[class*=pageIndex]');
  assert.equal(component.length, 1, 'component exists');
  assert.equal(component.find('button').eq(0).text().trim(), 'Previous');
  assert.equal(component.find('button').eq(4).text().trim(), 'Next');
  assert.equal(component.find('button').length, 5, '5 buttons are found (including next and previous)'); 
});

test('The page number for the currently displayed page is highlighted', function(assert) {
  assert.expect(4);

  this.set('pages', [1, 2, 3]);
  this.set('pageNumber', 0);
  this.render(hbs`{{ember-dynamic-table-pagination-index model=pages pageNumber=pageNumber}}`);

  var buttons = this.$('[class*=pageIndex]').find('button');
  assert.equal(buttons.length, 5, 'component exists');
  assert.ok(buttons.eq(1).hasClass('active'), 'element contains the \'active\' class');
  assert.notOk(buttons.eq(2).hasClass('active'), 'element does not contain the \'active\' class');
  assert.notOk(buttons.eq(3).hasClass('active'), 'element does not contain the \'active\' class');
});

test('The previous button is disabled when on the first page', function(assert) {
  assert.expect(4);

  this.set('pages', [1, 2, 3]);
  this.set('pageNumber', 0);
  this.render(hbs`{{ember-dynamic-table-pagination-index model=pages pageNumber=pageNumber}}`);

  var buttons = this.$('[class*=pageIndex]').find('button');
  assert.equal(buttons.length, 5, 'There are 5 buttons items');
  assert.equal(buttons.eq(0).text().trim(), 'Previous', 'the button text is correctly rendered');
  assert.ok(buttons.eq(0).is(':disabled'), 'The \'Previous\' is disabled');
  assert.notOk(buttons.eq(4).is(':disabled'), 'The \'Next\' is not disabled');
});

test('The next button is disabled when on the final page', function(assert) {
  assert.expect(4);

  this.set('pages', [1, 2, 3]);
  this.set('pageNumber', 2);
  this.render(hbs`{{ember-dynamic-table-pagination-index model=pages pageNumber=pageNumber}}`);

  var buttons = this.$('[class*=pageIndex]').find('button');
  assert.equal(buttons.length, 5, 'There are 5 buttons items');
  assert.equal(buttons.eq(4).text().trim(), 'Next');
  assert.ok(buttons.eq(4).is(':disabled', 'The \'Next\' is disabled'));
  assert.notOk(buttons.eq(0).is(':disabled'), 'The \'Previous\' is not disabled');
});

test('The first page number is shown as 1 and not 0', function(assert) {
  assert.expect(1);

  this.set('pages', [1, 2, 3]);
  this.set('pageNumber', 1);
  this.render(hbs`{{ember-dynamic-table-pagination-index model=pages pageNumber=pageNumber}}`);

  assert.equal(this.$('[class*=pageIndex]').find('button').eq(1).text().trim(), 1);
});
