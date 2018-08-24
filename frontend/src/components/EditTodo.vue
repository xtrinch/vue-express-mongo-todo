
<template>
  <b-modal visible id="modal-center" centered title="Edit todo" @ok="save()" @hidden="hideModal()">
    <div class="form">
      <div>
        <b-form-input v-model="title"
          type="text"
          placeholder="Title"></b-form-input>
      </div>
      <div>
        <b-form-textarea v-model="description"
          type="text"
          :rows="12"
          placeholder="Description"></b-form-textarea>      
      </div>
    </div>
  </b-modal>
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
      console.log(this.description)
      await TodoService.updateTodo({
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      })
    },
    async save() {
      await this.updateTodo();
    },
    hideModal () {
      this.$emit('changed')
      this.$router.push({ name: 'Todos' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 100%;
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