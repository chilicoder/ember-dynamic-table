import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-th';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  hover: false,
  attributeBindings: ['style'],
  style: 'cursor: pointer',

  click: function() {
    if (this.get('sortProperties')[0] === this.get('property')) {
      this.attrs.onSortByChange([this.get('sortProperties')[0].concat(':desc')]);
    } else {
      this.attrs.onSortByChange([this.get('property')]);
    }
  },

  mouseEnter: function() {
    this.set('hover', true);
  },
  mouseLeave: function() {
    this.set('hover', false);
  }
});
