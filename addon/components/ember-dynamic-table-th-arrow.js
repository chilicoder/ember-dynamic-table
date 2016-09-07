import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-th-arrow';

export default Ember.Component.extend({
  layout,
  tagName: 'i',
  classNames: ['fa'],
  classNameBindings: ['isHover:gray-dark', 'showArrow::hide','arrowDirection:fa-long-arrow-down:fa-long-arrow-up'],

  isHover: Ember.computed('hover', function() {
    if (this.get('hover') && this.get('sortProperties')[0].split(':')[0] !== this.get('property')) {
      return true;
    } else {
      return false;
    }
  }),

  showArrow: Ember.computed('sortProperties', 'hover', 'property', function() {
    if (this.get('hover')) {
      return true;
    } else {
      if (this.get('sortProperties')[0].split(':')[0] === this.get('property')) {
        return true;
      } else {
        return false;
      }
    }
  }),

  arrowDirection: Ember.computed('sortProperties', function() {
    if (this.get('sortProperties')[0].split(':')[0] === this.get('property')) {
      if (this.get('sortProperties')[0].indexOf(':desc') < 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  })
});
