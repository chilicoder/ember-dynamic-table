import { formatNumber, formatMoney } from 'accounting';

export default function valueFormatter(value, format) {
  if (format) {
    const type = format.type;
    const options = format.options || null;

    let precision = (typeof options[0] === 'number' ? options[0] : null);
    let thousand = options[1] || ',';
    let decimal = options[2] || '.';
    let symbol = options[3] || '£';

    switch (type) {
      case 'number':
        return formatNumber(value, precision || 0, thousand, decimal);
      case 'currency':
        return formatMoney(value, symbol, precision || 2, thousand, decimal);
      case 'percent':
        return formatNumber(value * 100, precision || 2, thousand, decimal) + '%';
      default:
        return value;
    }
  } else {
    return value;
  }
}
