import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['sortProperties', 'pageNumber', 'pageSize', 'filterText'], 
  sortProperties: ['name'],
  pageNumber: 0,
  pageSize: 3,
  pageSizeOptions: [1,2,3,4,5,10],

  availableColumns: [
    {
      'title': 'Name', 
      'property': 'name', 
      'filterable': true, 
    },
    {
      'title': 'User', 
      'property': 'user.username', 
      'filterable': true, 
    },
    {
      'title': 'Tags', 
      'property': 'tags.length', 
      'filterable': false, 
      'format': {'type':'number', 'options':[0]},
      'total': true
    },
    {
      'title': 'Records', 
      'property': 'records.length', 
      'filterable': true, 
      'format': {'type':'currency', 'options':[2]},
      'total': ['tags.length', 'divide', 2]
    }
  ],

  optionButtons: [
    {
      'color':'btn-success', 
      'icon':'fa-pencil', 
      'title':'Edit Organisation', 
      'disableOnMulti':true, 
      'actionId':'edit'
    },
    {
      'color':'btn-info', 
      'icon':'fa-gears', 
      'title':'Create Report', 
      'disableOnMulti':true, 
      'actionId':'create'
    },
    {
      'color':'btn-primary', 
      'icon':'fa-trash-o', 
      'title':'Delete Organisation(s)', 
      'disableOnMulti':false, 
      'actionId':'delete'
    }
  ],

  actions: {
    goToOrganisation(id) {
      this.transitionToRoute('organisations.show', id);
      return false;
    },
    optionButtonClicked(option, checkedItems) {
      console.log(checkedItems);
      switch(option) {
        case 'create':
          break;
        case 'edit':
          break;
        case 'delete':
          break;
        default:
          break;
      }
    }
  }
});
