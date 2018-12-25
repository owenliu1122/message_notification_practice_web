import axios from 'axios'

export default {
  ajaxGet (api, params, cb) {
    axios.get(api, {params: params})
      .then(cb)
      .catch(err => {
        console.log(err)
      })
  },
  ajaxPost (api, post, cb) {
    axios.post(api, post)
      .then(cb)
      .catch(err => {
        console.log(err)
      })
  },
  ajaxPut (api, post, cb) {
    axios.put(api, post)
      .then(cb)
      .catch(err => {
        console.log(err)
      })
  },
  ajaxDel (api, post, cb) {
    console.log('ajaxDel, ', post)
    axios.delete(api, {data: post})
      .then(cb)
      .catch(err => {
        console.log(err)
      })
  }
}
