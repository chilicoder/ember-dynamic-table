import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-footer-td';
import { formatNumber, formatMoney } from 'accounting';

// Example column object
/*
 *{
 *  'property': 'records.length', 
 *  'total': {
 *    'isCalc': true,
 *    'calc': ['tags.length', 'divide', 2],
 *    'format': { 
 *      'type': 'number', 
 *      'options': {
 *        'precision': 0,
 *        'thousand': '.',
 *        'decimal': '.',
 *        'symbol': '£'
 *      } 
 *    }
 *  }
 *}
 */

export default Ember.Component.extend({
  layout,
  tagName: 'td',

  total: Ember.computed('colObject', 'contentObjects', function() {
    let colObject = this.get('colObject');
    let contentObjects = this.get('contentObjects');
    let total = colObject.total;
    if (total && contentObjects) {
      let output = total.isCalc ? 
        this._calculate(total.calc, contentObjects) : 
        this._computeTotal(colObject.property, contentObjects);
      return this._valueFormatter(output, total.format);
    }
  }),

  _calculate: function(calc, contentObjects)  {
    if (calc && calc.length == 3) {
      let prop1 = this._getValue(calc[0], contentObjects);
      let prop2 = this._getValue(calc[2], contentObjects);
      let action = calc[1];

      let result;
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
    }
    return 0;
  },

  _getValue: function(property, contentObjects) {
    return Ember.$.isNumeric(property) ? property : this._computeTotal(property, contentObjects);
  },

  _computeTotal: function(property, contentObjects) {
    return contentObjects.reduce(function(total, item) {
      return item[property] ? item[property] : item.get(property);
    }, 0);
  },

  _valueFormatter: function(value, format) {
    if (format) {
      let type = format.type;
      let precision;
      let thousand = format.options && format.options.thousand ? format.options.thousand : ',';
      let decimal = format.options && format.options.decimal ? format.options.decimal : '.';
      let symbol = format.options && format.options.symbol ? format.options.symbol : '£';

      switch (type) {
        case 'currency':
          precision = format.options && typeof format.options.precision === 'number' ? format.options.precision : 2;
          return formatMoney(value, symbol, precision, thousand, decimal);
        case 'percent':
          precision = format.options && typeof format.options.precision === 'number' ? format.options.precision : 2;
          return formatNumber(value * 100, precision, thousand, decimal) + '%';
        default:
          precision = format.options && typeof format.options.precision === 'number' ? format.options.precision : 0;
          return formatNumber(value, precision, thousand, decimal);
      }
    } else {
      return value;
    }
  }
});
