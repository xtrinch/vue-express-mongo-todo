import Vue from 'vue'
import Api from '@/services/Api'

export default {
  async getTodos (context) {
    const response = await Api().get('todos')
    context.commit('SET_TODOS', response.data.todos)
  },
}