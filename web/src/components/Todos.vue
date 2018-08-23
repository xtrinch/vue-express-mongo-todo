<template>
  <div class="posts">
    <h1>Todos</h1>
    <table>
      <tr>
        <td>Title</td>
        <td>Description</td>
        <td align="center" colspan="2">Action</td>
      </tr>
      <tr v-for="todo in todos">
        <td><b>{{ todo.title }}</b></td>
        <td>{{ todo.description }}</td>
        <td>
          <router-link v-bind:to="{ name: 'EditTodo', params: { id: todo._id } }">Edit</router-link>
        </td>
        <td>
          <a href="#" @click="deleteTodo(todo._id)">Delete</a>
        </td>
      </tr>
    </table>
    <div class="add-todo">
      <router-link v-bind:to="{ name: 'NewTodo' }" class="add_post_link">Add Todo</router-link>
    </div>
  </div>
</template>

<script>
import TodoService from '@/services/TodoService'
export default {
  name: 'todos',
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    this.getTodos()
  },
  methods: {
    async getTodos () {
      const response = await TodoService.fetchTodos()
      console.log(response.data);
      this.todos = response.data.todos
    },
    async deleteTodo (id) {
      await TodoService.deleteTodo(id)
      this.getTodos();
    }
  }
}
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}

table {
  margin: 0 auto;  
}

table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}

.add-todo {
  min-height: 35px;
  margin-top: 10px;
}

.add-todo a {
  display: block;
  width: 65px;
  margin: 0 auto;
}

</style>