import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-td';
import valueFormatter from '../utils/value-formatter';

export default Ember.Component.extend({
  layout,
  tagName: 'td',
  attributeBindings: ['style'],
  style: 'cursor: pointer',
  format: '',

  formattedOutput: Ember.computed('text', function() {
    let text = this.get('text');
    let format = this.get('format');
    return valueFormatter(text, format);
  })
});
