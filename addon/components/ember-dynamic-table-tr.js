import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-tr';

export default Ember.Component.extend({
  layout,
  tagName: 'tr',
  classNameBindings: ['isChecked:highlighted'], 
  attributeBindings: ['style'],

  style: Ember.computed('row.isBold', function() {
    let cursor = 'cursor: pointer; ';
    return this.get('row').get('isBold') ? cursor + 'font-weight:bold;' : cursor;
  }),

  isChecked: Ember.computed('row.checked', function() {
    return this.get('row').checked;
  }),

  change: function() {
    this.attrs.onCheckedChange(this.get('row'));
  },

  showCheckbox: Ember.computed('numOptionButtons', function() {
    return this.get('numOptionButtons') > 0 ? true : false;
  })
});
