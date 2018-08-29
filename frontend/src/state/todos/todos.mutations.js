export default {
  SET_TODOS (state, data) {
    state.todos = data.todos
    state.perpage = data.perpage
    state.rows = data.rows
  },
  UPDATE_PAGE (state, page) {
  	state.page = page
  }
}
