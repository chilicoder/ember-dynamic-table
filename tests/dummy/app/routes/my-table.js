import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      {
        "id": 1,
        "name": "Apexi",
        "user": {
          "id": 1,
          "username": "user1"
        },
        "tags": [1, 2, 3],
        "records": [1, 2]
      },
      {
        "id": 2,
        "name": "Lucent Corp",
        "user": {
          "id": 1,
          "username": "user1"
        },
        "tags": [1, 2],
        "records": [1]
      },
      {
        "id": 3,
        "name": "Saplimited",
        "user": {
          "id": 2,
          "username": "user2"
        },
        "tags": [1, 2],
        "records": [1]
      },
      {
        "id": 4,
        "name": "Radiant Arts",
        "user": {
          "id": 2,
          "username": "user2"
        },
        "tags": [1, 2],
        "records": [1]
      },
      {
        "id": 5,
        "name": "Bulldale",
        "user": {
          "id": 3,
          "username": "user3"
        },
        "tags": [1, 2, 3, 4],
        "records": [1, 2, 3, 4, 5]
      }
    ];
  }
});
