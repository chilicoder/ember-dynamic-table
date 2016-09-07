import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-tr';

export default Ember.Component.extend({
  layout,
  tagName: 'tr',
  classNameBindings: ['isChecked:highlighted'], 
  attributeBindings: ['style'],

  style: Ember.computed('model.isBold', function() {
    if (this.get('model').get('isBold')) {
      return 'font-weight:bold';
    }
  }),

  isChecked: Ember.computed('model.checked', function() {
    return this.get('model').checked;
  }),

  change: function() {
    this.attrs.onCheckedChange(this.get('model'));
  },

  showCheckbox: Ember.computed('model.optionButtons', function() {
    return this.get('optionButtons') > 0 ? true : false;
  })
});
