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
      'color':'btn-primary', 
      'icon':'fa-trash-o', 
      'title':'Delete Organisation(s)', 
      'disableOnMulti':false, 
      'actionId':'deleteOrganisation'
    },
    {
      'color':'btn-success', 
      'icon':'fa-pencil', 
      'title':'Edit Organisation', 
      'disableOnMulti':true, 
      'actionId':'editOrganisation'
    },
    {
      'color':'btn-info', 
      'icon':'fa-gears', 
      'title':'Create Report', 
      'disableOnMulti':true, 
      'actionId':'createReport'
    }
  ],

  actions: {
    goToOrganisation(id) {
      this.transitionToRoute('organisations.show', id);
      return false;
    },
    optionButtonClicked(option, checkedItems) {
      switch(option) {
        case 'deleteOrganisation':
          console.log('deleteOrganisation');
          break;
        case 'editOrganisation':
          console.log('editOrganisation');
          console.log(checkedItems[0].id);
          break;
        case 'createReport':
          console.log('createReport');
          break;
        default:
          console.log('default');
          break;
      }
    }
  }
});
