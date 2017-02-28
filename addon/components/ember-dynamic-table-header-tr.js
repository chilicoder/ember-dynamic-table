import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-header-tr';

export default Ember.Component.extend({
  layout,
  tagName: 'tr',

  showCheckbox: Ember.computed('numOptionButtons', function() {
    return this.get('numOptionButtons') > 0 ? true : false;
  })
});
