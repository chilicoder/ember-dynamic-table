import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-pagination-index';

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['pageIndex'],

  disabledPrevious: Ember.computed('pageNumber', 'model', function() {
    if (this.get('pageNumber') === 0) {
      return 'disabled';
    }
  }),

  disabledNext: Ember.computed('pageNumber', 'model', function() {
    if (this.get('model.length') !== 0) {
      if (this.get('pageNumber') + 1 >= this.get('model.length')) {
        return 'disabled';
      }
    }
  }),

  previous: Ember.computed('pageNumber', 'model', function() {
    if (this.get('pageNumber') > 0) {
      return this.get('pageNumber') - 1;
    } else {
      return this.get('pageNumber');
    }
  }),

  next: Ember.computed('pageNumber', 'model', function() {
    if (this.get('pageNumber') + 1 < this.get('model.length')) {
      return this.get('pageNumber') + 1;
    } else {
      return this.get('pageNumber');
    }
  }),
  
  actions: {
    selectPage(page) {
      this.attrs.onPageChange(page);
    }
  }
});
