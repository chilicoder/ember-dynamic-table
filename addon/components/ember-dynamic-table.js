import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table';
import filterByQuery from 'ember-cli-filter-by-query/util/filter';
import computedFilterByQuery from 'ember-cli-filter-by-query';

/*
 * action: optionButtonClicked
 */

export default Ember.Component.extend({
  layout,
  pageNumber: 0,
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  sortProperty: null,

  showPagination: Ember.computed('filteredContent', 'pageSize', function() {
    let filteredContent = this.get('filteredContent');
    let pageSize = this.get('pageSize');
    return filteredContent.length > pageSize ? true : false;
  }),

  // Create a proxy list of the model objects, adding a 'checked' boolean to the object.
  proxiedModel: Ember.computed.map('model', function(model) {
    return Ember.ObjectProxy.create({ content: model, checked: false });
  }),

  filterableProperties: Ember.computed('availableColumns', function() {
    let availableColumns = this.get('availableColumns');
    let filterableColObjs = availableColumns.filter(column => { return column.filterable; });
    return filterableColObjs.map(colObj => { return colObj.property; });
  }),

  filteredContent: Ember.computed('proxiedModel', 'availableColumns', 'filterText', 'pageSize', 'pageNumber', function() {
    let proxiedModel = this.get('proxiedModel');
    let filterText = this.get('filterText');
    let properties = this.get('filterableProperties');
    return filterByQuery(proxiedModel, properties, filterText, { conjunction: 'and' });
  }),

  sortedContent: Ember.computed.sort('filteredContent', 'sortProperty'),

  // Returns an array of page arrays
  pages: Ember.computed('sortedContent.[]', 'pageNumber', function() {
    var pages = [];
    var sortedContent = this.get('sortedContent');
    while (sortedContent.length > 0) {
      pages.push(sortedContent.splice(0, this.get('pageSize')));
    }
    return pages;
  }),

  // Returns the correct page array from the array
  paginatedContent: Ember.computed('pages', 'pageNumber', function() {
    return this.get('pages')[this.get('pageNumber')];
  }),

  // A list of the proxied models that have been checked.
  proxiedCheckedItems: Ember.computed.filterBy('proxiedModel', 'checked', true),

  // Map back out the content property of each ObjectProperty to return 
  // the ember-data object initially passed
  checkedItems: Ember.computed.mapBy('proxiedCheckedItems', 'content'),

  actions: {
    toggleCheckedProperty: function(proxiedModelObject) {
      proxiedModelObject.toggleProperty('checked');
    },
    sortBy: function(sortProperty) {
      this.set('sortProperty', [sortProperty]);
    },
    setPageSize: function(pageSize) {
      this.set('pageSize', pageSize);
      this.set('pageNumber', 0);
    },
    setPageNumber: function(pageNumber) {
      this.set('pageNumber', pageNumber);
    },
    optionButtonClicked: function(option) {
      this.attrs.optionButtonClicked(option, this.get('checkedItems'));
    }
  }
});
