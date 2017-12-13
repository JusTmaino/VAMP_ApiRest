/**
 * Car.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    registerNumber: {
      type: 'string'
    },
    brand: {
      type: 'string'
    },
    model:{
      type: 'string'
    },
    avatar:{
      type: 'string'
    },

    // One way association
    controls: { 
        model: 'controls'
    },


    // Many-to-Many
    owners: {
      collection: 'user',
      via: 'cars'
    }
  }

  


};

