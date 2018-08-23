
<template>
  <div class="posts">
    <h1>Edit Todo</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="updateTodo">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import TodoService from '@/services/TodoService'
export default {
  name: 'EditTodo',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getTodo()
  },
  methods: {
    async getTodo () {
      const response = await TodoService.getTodo({
        id: this.$route.params.id
      })
      this.title = response.data.todo.title
      this.description = response.data.todo.description
    },
    async updateTodo () {
      await TodoService.updateTodo({
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      })
      this.$router.push({ name: 'Todos' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>