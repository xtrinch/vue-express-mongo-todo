import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://${window.location.hostname}:${process.env.NODE_ENV=='production' ? 80 : 8081}`
  })
}
