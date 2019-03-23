
const str='http://cs.xhfwy.com/public/index.php/client/v3';

import {
  login
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({commit}, data) {
      return new Promise((relove, reject) => {
        axios.post(str+'/user/login', data)
          .then(data => {
            relove(data.data)
          })
      })
    },
		getCode({commit}, data) {
		  return new Promise((relove, reject) => {
		    axios.get(str+'/user/verfiy',{responseType: 'arraybuffer'})
		      .then(data => {
		        relove(data.data)
		      })
		  })
		},
  }
}

export default user
