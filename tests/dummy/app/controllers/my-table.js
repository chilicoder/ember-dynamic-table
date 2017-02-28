import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  sortProperty: ['name'],
  queryParams: ['sortProperty', 'pageNumber', 'pageSize', 'filterText'], 
  pageNumber: 0,
  pageSize: 3,
  pageSizeOptions: [1,2,3,4,5,10],

  availableColumns: [
    {
      'title': 'Name', 
      'property': 'name', 
      'filterable': true, 
      'sortable': true
    },
    {
      'title': 'User', 
      'property': 'user.username', 
      'filterable': false, 
      'sortable': true
    },
    {
      'title': 'Tags', 
      'property': 'tags.length', 
      'filterable': false, 
      'total': true
    },
    {
      'title': 'Records', 
      'property': 'records.length', 
      'filterable': true, 
      'total': {
        'isCalc': true,
        'calc': ['tags.length', 'divide', 2],
        'format': { 
          'type': 'number', 
          'options': {
            'precision': 0,
            'thousand': '.',
            'decimal': '.',
            'symbol': '£'
          } 
        }
      }
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
    goToOrganisation(model) {
      this.transitionToRoute('organisations.show', model.get('id'));
      return false;
    },
    optionButtonClicked(option, checkedItems) {
      console.log(checkedItems[0]);
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
