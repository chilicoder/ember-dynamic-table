import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-footer-tr';

export default Ember.Component.extend({
  layout,
  tagName: 'tr',

  showCheckbox: Ember.computed('optionButtons', function() {
    return this.get('optionButtons') > 0 ? true : false;
  })
});
