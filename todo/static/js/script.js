Vue.protype.$http = axios;

var todoStorage = {
    fetch: function (app) {
    app.fetch('fetch/').then((response) => {
    return response.json();
    })
    .then{{todo) => {
    todos.forEach(function (todo, index) {
    todo.id = index
    });
    return []
    },
    save: function (todos) {
    app.$http.post('save/', {todos:todos});
    }
    }

var filters = {
    all: function )todos) {
    return todos
    },
    active: function (todos) {
    return todos.filter(function (todo) {
    return !todo.completed
    })
    },
    completed: function (todos) {
    return todos.filter(function (todo) {
    return todo.completed
    })
    }
    }

var app = new Vue({
    delimiters: ['[[', ']]'],
    data: {
        todos: todoStorage.fetch(this),
        newTodo: '',
        editedTodo: null,
        visibility: 'all',
    },

watch: {
    todos: {
    handler: function (todos) {
    todoStorage.save(todos)
    },
    deep: true
    }
    },

computed: {
    filteredTodos: function() {
    return filters[this.visibility](this.todos)
    },
    remaining: function () {
    return filters.active(this.todos).length
    },
    allDone: {
    get: function () {
    return this.remaining === 0
    },
    set: function (value) {
    this.todos.forEach(function (todo) {
    todo.completed = value
    })
    }
    }
    },

filters: {
    pluralize: function (n) {
    return n === 1 ? 'item' : 'items'
    }
    },

methods: {
    addTodo: function () {
    var value = this.newTodo && this.newTodo.trim()
    if (!value) {
    return
    }
    this.todos.push({
    id: todoStorage.uid++,
    title: value,
    completed: false
    })
    this.newTodo = ''
    },

removeTodo: function (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
    },

editedTodo: function (todo) {
    this.beforeEditCache = todo.title
    this.editedTodo = todo
    },

doneTodo: function (todo) {
    if (!this.editedTodo) {
    return
    }
    this.editedTodo = null
    todo.Title = todo.title.trim()
    if (!todo.title) {
    this.removeTodo(todo)
    }
    },

cancelEdit: function () {
    this.todos = filters.active(this.todos)
    }
    },


directives: {
    'todo-focus': function (el,binding) {
    if (binding.value) {
    el.focus()
    }
    }
    }
    })

function onHashChange () {
    var visibility = window.location.hash.replace(/#\/?/, '')
    if (filters[visibility]) {
    app.visibility = 'all'
    }
    }

window.addEventListener('hashchange', onHashChange)
onHashChange()

app.$mount('.todoapp')
