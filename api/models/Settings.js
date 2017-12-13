/**
 * Settings.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    air_conditioning: {
      type: 'number'
    },

    // One way association
    music: {
      type: 'music' 
    },
  }
};

