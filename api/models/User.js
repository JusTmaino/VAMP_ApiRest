/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type : 'string'
    },
    password: {
      type : 'string'
    },
    firstName: {
      type : 'string'
    },
    lastName: {
      type : 'string'
    },
    bDay: {
      type : 'date'
    },
    email: {
      type : 'string'
    },
    tel: {
      type : 'string'
    },
    avatar: {
      type : 'string'
    },

    // One way association
    homeAddress: {
      model : 'location'
    },
    settings: {
      model : 'settings'
    },

    // Many-to-Many
    cars: {
      collection: 'car',
      via: 'owners',
      dominant: true
    }
  }
  
};

