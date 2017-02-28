import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-option-buttons';

/*
 * actions: buttonClicked
 *
 * optionButton properties:
 *  color
 *  icon
 *  title
 *  disableOnMulti
 *  actionId
 */

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['btn-group', 'option-buttons'],
  classNameBindings: ['showButtons::hide'],
  attributeBindings: ['role'],
  role: 'toolbar',
  checkedItems: [],

  showButtons: Ember.computed('checkedItems', function() {
    return this.get('checkedItems').length ? true : false;
  }),

  multipleChecked: Ember.computed('checkedItems', function() {
    return this.get('checkedItems').length > 1 ? true : false;
  })
});
