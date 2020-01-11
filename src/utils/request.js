import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use(function (config) {
  const { user } = store.state

  if (user) {
    config.headers.Authorization = `Beader ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    console.log('转换失败', err)
    return {}
  }
}]
export default request
