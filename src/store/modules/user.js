
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
						var data = data.data;
						if( Number(data.code) == 10000 ){ 
							relove(data);
						}else{
							reject(data.message);
						}
            
          })
      })
    },
		//验证码
		getCode({commit}, data) {
		  return new Promise((relove, reject) => {
		    axios.get(str+'/user/verfiy',{responseType: 'arraybuffer'})
		      .then(data => {
		        relove(data.data)
		      })
		  })
		},
		//个人信息
		myPersonal({commit}, data) {
		  return new Promise((relove, reject) => {
		    axios.post(str+'/home/showall', data)
		      .then(data => {
						
						var data = data.data;
						if( Number(data.code) == 10000 ){ 
							relove(data);
						}else{
							reject(data.message);
						}
		        
		      })
		  })
		},
		//个人收益
		myProfit({commit}, data) {
		  return new Promise((relove, reject) => {
		    axios.post(str+'/home/show', data)
		      .then(data => {
						var data = data.data;
						if( Number(data.code) == 10000 ){ 
							relove(data);
						}else{
							reject(data.message);
						}
		        
		      })
		  })
		},
		//文章编辑
		articleEdit({commit}, data) {
		  return new Promise((relove, reject) => {
		    axios.post(str+'/content/add', data)
		      .then(data => {
						var data = data.data;
						if( Number(data.code) == 10000 ){ 
							relove(data.message);
						}else{
							reject(data.message);
						}
		        
		      })
		  })
		},
		//文章列表
		articleList({commit}, data) {
		  return new Promise((relove, reject) => {
		    axios.post(str+'/content/showall', data)
		      .then(data => {
						var data = data.data;
						if( Number(data.code) == 10000 ){ 
							relove(data.data);
						}else{
							reject(data.message);
						}
		        
		      })
		  })
		},
  }
}

export default user
