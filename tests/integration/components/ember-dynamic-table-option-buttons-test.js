import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-table-option-buttons', 'Integration | Component | ember dynamic table option buttons', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(5);

  var optionButtons = [
    {'color':'btn-red', 'icon':'fa-trash-o', 'text':'', 'disableOnMulti':false, 'actionId':'delete'},
    {'color':'btn-blue', 'icon':'fa-pencil', 'text':'', 'disableOnMulti':true, 'actionId':'edit'}
  ];

  this.set('checkedItems', [1, 2, 3]);
  this.set('optionButtons', optionButtons);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);
  //this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems optionButtons=optionButtons buttonClicked=(action "mockOptionButtonClicked")}}`);

  var trob = this.$('span[class*=tableRowOptionButtons]');
  assert.equal(trob.length, 1);
  assert.ok(trob.find('button:eq(0) i').hasClass('fa'), 'Button contains the \'fa\' class');
  assert.ok(trob.find('button:eq(0) i').hasClass('fa fa-trash-o'), 'Button contains the \'fa-trash-o\' class');
  assert.ok(trob.find('button:eq(1) i').hasClass('fa'), 'Button contains the \'fa\' class');
  assert.ok(trob.find('button:eq(1) i').hasClass('fa fa-pencil', 'Button contains the \'fa-pencil\' class'));
});

test('If checkedItems length is greater than 0, ember-dynamic-table-option-buttons are visible', function(assert) {
  assert.expect(1);

  this.set('checkedItems', [1, 2, 3]);
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems}}`);

  assert.equal(this.$('span[class*=tableRowOptionButtons]').length, 1, 'option buttons are rendered');
});

test('If checkedItems length is zero, ember-dynamic-table-option-buttons are not visible', function(assert) {
  assert.expect(1);

  this.set('checkedItems', []);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons checkedItems=checkedItems buttonClicked=(action "mockOptionButtonClicked")}}`);

  assert.notOk(this.$('span[class*=tableRowOptionButtons]').hasClass('show'));
});

test('If checkedItems length is 1, the edit button is disabled', function(assert) {
  assert.expect(3);
  
  var optionButtons = [
    {'color':'btn-blue', 'icon':'fa-pencil', 'text':'', 'disableOnMulti':true, 'actionId':'edit'}
  ];

  this.set('checkedItems', [1]);
  this.set('optionButtons', optionButtons);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons 
      checkedItems=checkedItems 
      optionButtons=optionButtons 
      buttonClicked=(action "mockOptionButtonClicked")}}`);

  var trob = this.$('span[class*=tableRowOptionButtons]');
  assert.equal(trob.length, 1, 'option buttons are rendered');
  var editButton = this.$('button:eq(0)');
  assert.ok(editButton.find('i').hasClass('fa fa-pencil', 'Button contains the \'fa-pencil\' class'));
  assert.notOk(editButton.hasClass('btn-disabled'), 'Button does not contain the \'btn-disabled\' class');
});

test('If checkedItems length is greater than 1, the edit button is not disabled', function(assert) {
  assert.expect(3);
  
  var optionButtons = [
    {'color':'btn-blue', 'icon':'fa-pencil', 'text':'', 'disableOnMulti':true, 'actionId':'edit'}
  ];

  this.set('checkedItems', [1, 2]);
  this.set('optionButtons', optionButtons);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons 
      checkedItems=checkedItems 
      optionButtons=optionButtons 
      buttonClicked=(action "mockOptionButtonClicked")}}`);

  var trob = this.$('span[class*=tableRowOptionButtons]');
  assert.equal(trob.length, 1, 'option buttons are rendered');
  var editButton = this.$('button:eq(0)');
  assert.ok(editButton.find('i').hasClass('fa fa-pencil'), 'Button contains the \'fa-pencil\' class');
  assert.ok(editButton.is(':disabled'), 'button is disabled');
});

test('Option button displays title when hovered over', function(assert) {
  assert.expect(1);
  
  var optionButtons = [
    {'color':'btn-blue', 'icon':'fa-pencil', 'text':'', 'title':'mockEdit', 'disableOnMulti':true, 'actionId':'edit'}
  ];

  this.set('checkedItems', [1, 2]);
  this.set('optionButtons', optionButtons);
  this.on('mockOptionButtonClicked', function() {});
  this.render(hbs`{{ember-dynamic-table-option-buttons 
      checkedItems=checkedItems 
      optionButtons=optionButtons 
      buttonClicked=(action "mockOptionButtonClicked")}}`);

  var editButton = this.$('button:eq(0)');
  assert.equal(editButton.prop('title'), 'mockEdit');
});
