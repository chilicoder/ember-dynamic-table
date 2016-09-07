import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-header-tr';

export default Ember.Component.extend({
  layout,
  tagName: 'tr',

  showCheckbox: Ember.computed('optionButtons', function() {
    // use is present?
    if (this.get('optionButtons') > 0) {
      return true;
    } else {
      return false;
    }
  })
});
