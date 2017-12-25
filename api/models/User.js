var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {

    username  : {
      type: 'string',
      unique: true
    },
    email     : {
      type: 'email',
      unique: true
    },

    firstName: {
      type : 'string',
    //required: true
    },

    lastName: {
      type : 'string',
     //required: true
    },

    bDay: {
      type : 'date',
    //required: true
    },

    tel: {
      type : 'string',
    //required: true
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
    },

    passports : {
      collection: 'Passport',
      via: 'user'
    }
  }
};

module.exports = User;
