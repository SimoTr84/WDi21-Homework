var app = app || {};

// -----------------------------------
// The Todo Item View
// -----------------------------------

// the DOM element for a todo item is...
app.TodoView = Backbone.View.extend({

  tagName: 'li', // ... a list tag

  // cache the template function for a single item
  template: _.template( $('#item-template' ).html() ),

  // the DOM events specific to an item.
  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label' : 'edit',
    'click .destroy': 'clear',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close'
  },

  // the TodoView listeners for changes to its model, re-rendering. Since there's a one to one correspondence btw a todo and a TodoView in this app, we set a direct reference on the model fro convenience
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  // re-renders the titles of the todo items
  render: function () {
    this.$el.html( this.template( this.model.attributes) );

    this.$el.toggleClass( 'completed', this.model.get('completed') );
    this.toggleVisible();

    this.$input = this.$('edit');
    return this;
  },

  toggleVisible : function () {
      this.$el.toggleClass( 'hidden',  this.isHidden());
    },

  isHidden : function () {
    var isCompleted = this.model.get('completed');
    return ( (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active') );
  },

  togglecompleted: function() {
      this.model.toggle();
  },

  // switch this view into `editing` mode, displaying the input field.
  edit: function() {
    this.$el.addClassO('editing');
    this.$input.focus();
  },

  // close the `editing` mode, saving the changing to the todo.
  close: function () {
    var value = this.$input.val().trim();

    if (value) {
      this.model.save({ title: value });
    }

    this.$el.removeClass('editing');
  },

  // if you hit `enter`, we're trough editing the item
  updateOnEnter: function ( e ) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  },
// Remove the item, destroy the model from *localStorage* and delete its view.
  clear: function() {
    this.model.destroy();
  }

});
