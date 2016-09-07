import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-footer-td';
import valueFormatter from '../utils/value-formatter';

export default Ember.Component.extend({
  layout,
  tagName: 'td',

  total: Ember.computed('filteredContent', function() {
    var property = this.get('property');
    var propertyFromMap = this.get('propertiesMap').get(property);
    if (propertyFromMap) {
      var output = Ember.$.isArray(propertyFromMap) ? 
        this.calculate(propertyFromMap[0], propertyFromMap[1], propertyFromMap[2]) : 
        this.computeTotal(property);

      return valueFormatter(output, this.get('format'));
    }
  }),

  calculate: function(a, action, b)  {
    var prop1 = this.getValue(a);
    var prop2 = this.getValue(b);

    var result;
    switch(action) {
      case 'add':
        result = prop1 + prop2;
        break;
      case 'subtract':
        result = prop1 - prop2;
        break;
      case 'multiply':
        result = prop1 * prop2;
        break;
      case 'divide':
        result = prop1 / prop2;
        break;
      default:
        result = 0;
        break;
    }
    return result;
  },

  getValue: function(property) {
    return Ember.$.isNumeric(property) ? property : this.computeTotal(property);
  },

  computeTotal: function(property) {
    return this.get('filteredContent').reduce(function(total, item) {
      return total + item.get(property);
    }, 0);
  }
});
