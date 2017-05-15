var app = app || {};
var ENTER_KEY = 13;

$(function () {
  // starts by creating the app
  new app.AppView();
});

// -----------------------------------
// The Application
// -----------------------------------

app.AppView = Backbone.View.extend({

  // we don't create a new element in html but we link to what we already set as structure
  el: "#todoapp",

  // template for the statistics at bottom of app
  statsTemplate: _.template( $( '#stats-template').html() ),

  // these events will manage adding new items  and clearing completed ones
  events: {
    'keypress #newtodo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  // lets set our initialize function, to bind the todo items when added or changed
  initialize: function() {
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(app.Todos, 'add', this.addOne);
    this.listenTo(app.Todos, 'reset', this.addAll);

    this.listenTo(app.Todos, 'change:completed', this.filterOne);
    this.listenTo(app.Todos,'filter', this.filterAll);
    this.listenTo(app.Todos, 'all', this.render);

    // debugger;
    app.Todos.fetch();
  },

  // re-rendering the app means refreshing the statistics only, everything else doesn't change
  render: function () {
    var completed = app.Todos.completed().length;
    var remaining = app.Todos.remaining().length;

    if (app.Todos.length) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statusTemplate({
        completed: completed,
        remaining: remaining
      }));

      this.$('#filters li a')
      .removeClass('selected')
      .filter('[href=#/]' + ( app.TofoFilter || '') +'"]')
      .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer();
    }

    this.allCheckbox.checked = !remaining;
  },

  // add a single todo item to the list by creating a view for it and appending its element to the 'ul'
  addOne: function () {
    var view = new app.TodoView({ model: todo});
    $('#todo-list').append( view.render().el );
  },

  // add all tiems in the todos collection at once
  addAll: function () {
    this.$('#todo-list').html('');
    app.Todos.each(this.addOne, this);
  },

  filterOne : function (todo) {
    todo.trigger('visible');
  },

  filterAll : function () {
    app.Todos.each(this.filterOne.this);
  },

  // generate the attributes for a new todo item
  newAttributes: function () {
    return {
      title: this.$input.val().trim(),
      order: app.Todos.nextOrder(),
      completed: false
    };
  },

  createOnEnter: function (event) {
    if (event.which !== ENTER_KEY || this.$input.val().trim() ) {
      return;
    }

    app.Todos.create( this.newAttributes() );
    this.$input.val('');
  },

  clearCompleted: function () {
    _.invoke(app.Todos.completed(), 'destroy');
    return false;
  },
  toggleAllComplete: function () {
    var completed = this.allCheckbox.checked;

    app.Todos.each(function (todo) {
      todo.save({
        'completed':completed
      });
    });
  }

});
