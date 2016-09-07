import valueFormatter from 'dummy/utils/value-formatter';
import { module, test } from 'qunit';

module('Unit | Utility | value formatter');

test('Number format is correctly returned', function(assert) {
  var format = {'type':'number', 'options':[2]};
  var result = valueFormatter(5, format);
  assert.deepEqual(result, "5.00");
});

test('Currency format is correctly returned', function(assert) {
  var format = {'type':'currency', 'options':[3]};
  var result = valueFormatter(5, format);
  assert.deepEqual(result, "£5.000");
});

test('Percent format is correctly returned', function(assert) {
  var format = {'type':'percent', 'options':[2]};
  var result = valueFormatter(0.5, format);
  assert.deepEqual(result, "50.00%");
});
