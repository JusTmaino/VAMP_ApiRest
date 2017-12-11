'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  descritpion: {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    bDay: Date,
    email: String,
    tel: String,
    address: {
        latitude: Number,
        longitude: Number,
    },
    avatar: String,
  },
  settings: {
    air_conditioning: Number,
    music:{
        volume: Number,
        playlist: { name: String,
                    media :{
                        url: String,
                    }

                }
        }    
  },
  voiture: {
    registerNumber: String,
    brand: String,
    model: String,
    avatar:String,
    controls: {
        lock: Boolean,
        air_conditioning: String,
    }
  }
});

module.exports = mongoose.model('Users', UserSchema);