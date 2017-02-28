import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ember-dynamic-ember-dynamic-table-footer-td', 'Integration | Component | ember dynamic table footer td', {
  integration: true
});

var FilteredContentJson = [
  { 'id':0, 'units':2000.5 },
  { 'id':1, 'units':3000 },
  { 'id':2, 'units':1000 },
  { 'id':3, 'units':4000 }
];

var Total = FilteredContentJson.reduce(function(total, val) {
  return total + val.units;
},0);

test('it renders', function(assert) {
  assert.expect(1);
  var colObject = {
    'property': 'units', 
    'total': {
      'isCalc': true,
      'calc': ['tags.length', 'divide', 2],
      'format': { 
        'type': 'currency', 
        'options': {
          'precision': 0,
          'thousand': '.',
          'decimal': '.',
          'symbol': '£'
        } 
      }
    }
  };

  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').length, 1, 'the <td> is rendered');
});

test('if column object does not include a total object, nothing is rendered', function(assert) {
  assert.expect(1);
  let colObject = { 'property': 'units' };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "");
});

test("if column object contains a total object with an isCalc property of false, the total is summed", function(assert) {
  assert.expect(1);
  let colObject = { 'property': 'units', 'total': { 'isCalc': false } };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), Total);
});

test("if column object contains a total object without an isCalc property, false is default", function(assert) {
  assert.expect(1);
  let colObject = { 'property': 'units', 'total': {} };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), Total);
});

test("if column object does not include a content array, nothing is rendered", function(assert) {
  assert.expect(1);
  let colObject = { 'property': 'units', 'total': {} };
  this.set('colObject', colObject);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject}}`);
  assert.equal(this.$('td').text().trim(), "");
});

test('the default formatting of total is as number, to the appropriate decimal places, with no thousand separator', function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': {} 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "10000.5");
});

test('when total object contains a format object which contains an options object with a numerical precision property, total is formatted to that number of decimal places', function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'options': {
          'precision': 2
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "10,000.50");
});

test('when total object contains a format object which contains an options object with a non-numerical precision property, default formatting is applied to the total', function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'options': {
          'precision': 'x',
          'decimal': '#'
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "10,001");
});

test('when total object contains a format object which contains an options object with a thousand property, total is formatted to that number of decimal places', function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'options': {
          'thousand': '.'
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "10.001");
});

test("when total object contains a format object which contains an options object with a numerical precision property & a decimal property, decimal property value is used as the total's decimal separator", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'options': {
          'precision': 1,
          'decimal': '#'
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "10,000#5");
});

test("when total object contains a format object which contains a type property of 'currency', total is preceeded by a '£' and formatted to 2 decimal places", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'type': 'currency'
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "£10,000.50");
});

test("when total object contains a format object which contains a type property of 'currency', & an options object with numerical precision property, total is formatted to that number of decimal places", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'type': 'currency',
        'options': {
          'precision': 3
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "£10,000.500");
});

test("when total object contains a format object which contains a type property of 'currency' and an options object with a symbol property, total is preceeded by that symbol value", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'type': 'currency',
        'options': {
          'symbol': '#'
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "#10,000.50");
});

test("when total object contains a format object which does not contains a type property of 'currency' and an options object with a symbol property, total is not preceeded by that symbol value", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'options': {
          'symbol': '#'
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "10,001");
});

test("when total object contains a format object which contains a type property of 'percent', total is multiplied by 100 and a % sign is appended to the end", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'type': 'percent'
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "1,000,050.00%");
});

test("when total object contains a format object which contains a type property of 'percent', & an options object with numerical precision property, total is formatted to that number of decimal places", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'format': {
        'type': 'percent',
        'options': {
          'precision': 3
        }
      }
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "1,000,050.000%");
});

test("if column object contains a total object with an isCalc property of true, but total does not contain a calc property, 0 is returned", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "0");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is not an array, 0 is returned", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': 1
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "0");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is not an array of length 3, 0 is returned", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [2, 'multiply', 2, 2]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "0");
});


test("if column object contains a total object with an isCalc property of true, and a calc property that is an array of length 3, but the 2nd array value is not a string, 0 is returned", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [2, 2, 2]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "0");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is an array of length 3, but the 2nd array value is not a recognised value, 0 is returned", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [2, 'something', 2]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "0");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is an array of length 3, but the 2nd array value is 'add', the two values are added", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [2, 'add', 3]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "5");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is an array of length 3, but the 2nd array value is 'subtract', the 2nd value is subtracted from the 1st", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [6, 'subtract', 2]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "4");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is an array of length 3, but the 2nd array value is 'multiply', the two values are multiplied", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [2, 'multiply', 3]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "6");
});

test("if column object contains a total object with an isCalc property of true, and a calc property that is an array of length 3, but the 2nd array value is 'divide', the 1st value is divided by the 2nd", function(assert) {
  assert.expect(1);
  let colObject = { 
    'property': 'units', 
    'total': { 
      'isCalc': true,
      'calc': [6, 'divide', 2]
    } 
  };
  this.set('colObject', colObject);
  this.set('contentObjects', FilteredContentJson);
  this.render(hbs`{{ember-dynamic-table-footer-td colObject=colObject contentObjects=contentObjects}}`);
  assert.equal(this.$('td').text().trim(), "3");
});
