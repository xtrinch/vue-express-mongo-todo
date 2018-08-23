import Api from '@/services/Api'

export default {
  getTodo (params) {
    return Api().get('todo/' + params.id)
  },

  fetchTodos () {
    return Api().get('todos')
  },

  addTodo (params) {
    return Api().post('todos', params)
  },

  updateTodo (params) {
    return Api().put('todo/' + params.id, params)
  },

  deleteTodo (id) {
    return Api().delete('todo/' + id)
  },
}
