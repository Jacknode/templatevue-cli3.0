// import Vue from 'vue'
// import Vuex from 'vuex'

Vue.use(Vuex)



import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'



const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    permission,
		tagsView,
    app,
    user
  },
  getters
});

export default store