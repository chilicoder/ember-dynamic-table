import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-option-buttons';

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['btn-group', 'tableRowOptionButtons'],
  classNameBindings: ['showButtons::hide'],
  attributeBindings: ['role'],
  role: 'toolbar',
  checkedItems: 0,

  showButtons: Ember.computed('checkedItems', function() {
    return this.get('checkedItems').length > 0 ? true : false;
  }),

  multipleChecked: Ember.computed('checkedItems', function() {
    return this.get('checkedItems').length > 1 ? true : false;
  })
});
