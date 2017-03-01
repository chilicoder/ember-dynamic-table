import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-th';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  attributeBindings: ['style'],
  isHover: false,
  sortProperty: ['Must provide sortProperty.'],
  property: 'Must provide Property',
  title: 'Must provide Title',

  style: Ember.computed('sortable', function() {
    if (this.get('sortable')) {
      return 'cursor:pointer';
    }
  }),

  mouseEnter: function() { this.set('isHover', true); },
  mouseLeave: function() { this.set('isHover', false); },

  showArrow: Ember.computed('sortProperty', 'property', 'isHover', 'sortable', function() {
    if (this.get('sortable')) {
      let isHover = this.get('isHover');
      let componentProperty = this.get('property');
      let sortProperty = this.get('sortProperty')[0].split(':')[0];
      return isHover || sortProperty === componentProperty ? true : false;
    } else {
      return false;
    }
  }),

  arrow: Ember.computed('sortProperty', 'property', 'isHover', function() {
    let componentProperty = this.get('property');
    let sortProperty = this.get('sortProperty')[0].split(':')[0];
    let sortIsDesc = this.get('sortProperty')[0].split(':').includes('desc');
    return sortProperty !== componentProperty || !sortIsDesc ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up';
  }),

  click: function() {
    if (this.get('sortable')) {
      let componentProperty = this.get('property');
      let sortProperty = this.get('sortProperty')[0];
      let newProperty = sortProperty === componentProperty ? sortProperty.concat(':desc') : componentProperty;
      this.attrs.onSortByChange(newProperty);
    }
  }
});
