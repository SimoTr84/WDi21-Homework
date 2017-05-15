
var app = app || {};

// -----------------------------------
// The ToDo Model
// -----------------------------------
app.Todo = Backbone.Model.extend({
  defaults: {
    title:'',
    completed: false
  }, // set the defaults for esch new item on the todo list

  toggle: function () {
    this.save({
      completed: !this.get('completed')
    }); // this toggles the completed state of a todo item when required
  }

});
