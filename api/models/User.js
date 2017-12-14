/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//npm install sails-hook-validation --save 
module.exports = {

  attributes: {
    username: {
      type : 'string',
	  required: true,
	  unique: true
    },
    password: {
      type : 'string',
	  required: true
    },
    firstName: {
      type : 'string',
	  required: true
    },
    lastName: {
      type : 'string',
	   required: true
    },
    bDay: {
      type : 'date',
	  required: true
    },
    email: {
      type : 'email',
	  required: true,
	  unique: true
    },
    tel: {
      type : 'string',
	  required: true
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

