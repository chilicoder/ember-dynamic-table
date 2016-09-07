import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-table';
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

export default Ember.Component.extend({
  layout,
  pageNumber: 0,
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],

  filterableColumns: Ember.computed('availableColumns', function() {
    var filterableColumns = [];
    this.get('availableColumns').filter(function(item) {
      if (item.filterable) {
        filterableColumns.push(item.property);
      }
    });
    return filterableColumns;
  }),

  propertiesWithTotals: Ember.computed('availableColumns', function() {
    var properties = new Map();
    this.get('availableColumns').filter(function(item) {
      if(item.total) {
        properties.set(item.property, item.total);
      }
    });
    return properties;
  }),

  resetPage: Ember.observer('filterText', 'pageSize', function() {
    this.set('pageNumber', 0);
  }),

  // Create a proxy list of the model objects, adding a 'checked' boolean to the object.
  proxiedModel: Ember.computed.map('model', function(model) {
    return Ember.ObjectProxy.create({
      content: model,
      checked: false
    });
  }),

  filteredContent: Ember.computed('filterText', 'pageSize', 'pageNumber', 'proxiedModel', function() {
    var filtered = filterByQuery(
      this.get('proxiedModel'), 
      this.get('filterableColumns'),
      this.get('filterText'), 
      {conjunction: 'and'}
    );
    return filtered;
  }),

  //sortedContent: Ember.computed.sort('filteredContent', 'sortProperties').property('pageSize', 'sortProperties'),
  sortedContent: Ember.computed.sort('filteredContent', 'sortProperties'),
  sortedContentA: Ember.computed('sortedContent', 'pageSize', 'sortProperties', function() {
    return this.get('sortedContent');
  }),

  // Returns an array of page arrays
  pages: Ember.computed('sortedContentA.[]', 'pageNumber', function() {
    var pages = [];
    var sortedContent = this.get('sortedContentA');
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
      this.set('sortProperties', sortProperty);
    },
    setPageSize: function(pageSize) {
      this.set('pageSize', pageSize);
    },
    setPageNumber: function(pageNumber) {
      this.set('pageNumber', pageNumber);
    }
  }
});
