'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/userController');

  //  Routes
  app.route('/users')
    .get(todoList.list_all_users)
    .post(todoList.create_a_user);

  app.route('/user/:userId')
    .get(todoList.read_a_user)
    .put(todoList.update_a_user)
    .delete(todoList.delete_a_user);
};