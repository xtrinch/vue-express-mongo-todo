import Vue from 'vue'
import Api from '@/services/Api'

export default {
  async getTodos (context) {
    const response = await Api().get('todos', { params: { 'page': context.state.page }})
    context.commit('SET_TODOS', response.data)
  },
  async updatePage(context, page) {
    context.commit('UPDATE_PAGE', page)
    await context.dispatch('getTodos')
  }
}