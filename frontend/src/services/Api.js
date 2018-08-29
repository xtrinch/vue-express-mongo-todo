import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://${window.location.hostname}:${process.env.PORT || 8081}`
  })
}
