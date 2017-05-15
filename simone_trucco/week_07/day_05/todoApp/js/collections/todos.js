
var app = app || {};

// -----------------------------------
//  Todo Collection
// -----------------------------------
// this collection of todos is backed by "localStorage" instead of a remote server

var TodoList = Backbone.Collection.extend ({

  model: app.Todo,
  // this is a reference to to the models/todo.js file

  localStorage: new Backbone.LocalStorage('todos-backbone'),
  // this will save all the items/data locally in the lib/backbone.localStorage file

  completed: function () {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  }, // this to filter down all the finished to dos

// filter downthe list to opnly todo items that are still not finished.
remainin: function () {
return this.without.apply( this, this.completed() );
},

// keep the todos in sequential order event though they are saved in unordered list. this step generates the next order number for the new items
nextOrder: function () {
  if ( !this.lenght ) {
    return 1;
  }
  return this.last().get('order') + 1;
},

// todos are sorted by their original insertion order
comparator: function (todo) {
  return todo.get('order');
}

});

//  create our global collecton of todos
app.todos = new TodoList();
