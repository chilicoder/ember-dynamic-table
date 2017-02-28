import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-ember-dynamic-table-pagination-index', 'Integration | Component | ember dynamic table pagination index', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);
  this.set('pages', 3);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages}}`);
  const component = this.$('.pageIndex');
  assert.equal(component.length, 1, 'component exists');
  assert.equal(component.find('.btn-previous').text().trim(), 'Previous');
  assert.equal(component.find('.btn-next').text().trim(), 'Next');
  assert.equal(component.find('button').length, 5, '5 buttons are found (including next and previous)'); 
});

test('Only the current page number button is highlighted', function(assert) {
  assert.expect(3);
  this.set('pages', 3);
  this.set('pageNumber', 1);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  const buttons = this.$('[class*=pageIndex]').find('button');
  assert.ok(buttons.eq(2).hasClass('active'), 'element contains the active class');
  assert.notOk(buttons.eq(1).hasClass('active'), 'element does not contain the active class');
  assert.notOk(buttons.eq(3).hasClass('active'), 'element does not contain the active class');
});

test('Previous button is disabled when on the first page', function(assert) {
  assert.expect(1);
  this.set('pages', 3);
  this.set('pageNumber', 0);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  const previousButton = this.$('.btn-previous');
  assert.ok(previousButton.is(':disabled'), "The 'Previous' is disabled");
});

test('Next button is not disabled when on the first page & numPages > 1', function(assert) {
  assert.expect(1);
  this.set('pages', 3);
  this.set('pageNumber', 0);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  const nextButton = this.$('.btn-next');
  assert.notOk(nextButton.is(':disabled'), "The 'Next' button is not disabled");
});

test('Next button is disabled when on the first page & numPages = 1', function(assert) {
  assert.expect(1);
  this.set('pages', 3);
  this.set('pageNumber', 0);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  const nextButton = this.$('.btn-next');
  assert.notOk(nextButton.is(':disabled'), "The 'Next' button is not disabled");
});

test('Next & Previous buttons are not disabled when there are pages before and after the current page', function(assert) {
  assert.expect(2);
  this.set('pages', 3);
  this.set('pageNumber', 1);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  const buttons = this.$('[class*=pageIndex]').find('button');
  assert.notOk(buttons.eq(0).is(':disabled'), "The 'Previous' button is disabled");
  assert.notOk(buttons.eq(4).is(':disabled'), "The 'Next' button is not disabled");
});

test('Next button is disabled when on the final page', function(assert) {
  assert.expect(1);
  this.set('pages', 3);
  this.set('pageNumber', 3);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  const nextButton = this.$('.btn-next');
  assert.ok(nextButton.is(':disabled', "The 'Next' is disabled"));
});

test('The first page number is shown as 1 and not 0', function(assert) {
  assert.expect(1);
  this.set('pages', 3);
  this.set('pageNumber', 1);
  this.render(hbs`{{ember-dynamic-table-pagination-index numPages=pages pageNumber=pageNumber}}`);
  assert.equal(this.$('.pageIndex').find('button').eq(1).text().trim(), 1);
});
