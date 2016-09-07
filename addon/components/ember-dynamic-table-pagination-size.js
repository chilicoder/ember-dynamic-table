import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table-pagination-size';

/*
 *pageSize
 */

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['pageSize'],

  actions: {
    selectPageSize(pageSize) {
      this.attrs.onPageSizeChange(pageSize);
    }
  }
});
