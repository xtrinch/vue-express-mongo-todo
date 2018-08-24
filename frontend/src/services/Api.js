import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:${process.env.PORT || 8081}`
  })
}
