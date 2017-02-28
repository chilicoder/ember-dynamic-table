import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-pagination-index';

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['pageIndex'],

  disabledPrevious: Ember.computed('pageNumber', function() {
    return this.get('pageNumber') === 0 ? 'disabled' : null;
  }),

  pageNumberPlusOne: Ember.computed('pageNumber', function() {
    return this.get('pageNumber') + 1;
  }),

  disabledNext: Ember.computed('pageNumber', 'numPages', function() {
    let numPages = this.get('numPages');
    let pageNumber = this.get('pageNumber');
    return pageNumber + 1 >= numPages ? 'disabled' : null;
  }),

  previous: Ember.computed('pageNumber', function() {
    let pageNumber = this.get('pageNumber');
    return pageNumber > 0 ? pageNumber - 1 : pageNumber;
  }),

  next: Ember.computed('pageNumber', 'numPages', function() {
    let numPages = this.get('numPages');
    let pageNumber = this.get('pageNumber');
    return pageNumber + 1 < numPages ? pageNumber + 1 : pageNumber;
  }),

  pages: Ember.computed('numPages', function() {
    let numPages = this.get('numPages');
    let pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(i);
    }
    return pages;
  }),
  
  actions: {
    selectPage(page) {
      this.attrs.onPageChange(page);
    }
  }
});
