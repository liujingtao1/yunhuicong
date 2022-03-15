import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,asyncRoutes,constantRoutes,anyRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',// 存储用户名
    avatar: '',// 存储用户头像
    // 菜单标记
    routes: [],
    roles: [],
    buttons: [],
    // 对比之后【项目中已有的异步路由，与服务器返回的标记信息，进行对比，最终需要展示的路由】
    resultAsyncRoutes: [],
    // 用户最终需要展示的全部路由
    resultAllRoutes: [],
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO:(state,userInfo) => {
    state.name = userInfo.name,// 存储用户名
    state.avatar = userInfo.avatar,// 存储用户头像
    // 服务器返回的菜单信息【根据不同的角色：返回的标记信息，数组里面的元素时字符串】
    state.routes = userInfo.routes,// 菜单权限标记
    state.buttons = userInfo.buttons,// 按钮权限标记
    // 角色
    state.roles = userInfo.roles;
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    // console.log(asyncRoutes);
    console.log(router);
    // vuex保存当前用户的异步路由，注意，一个用户需要展示完整的路由：他需要包含常量路由、异步路由、任意路由
    state.resultAsyncRoutes = asyncRoutes;
    // 计算出当前用户需要展示的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);
    // 给路由添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

const actions = {
  // 处理登录业务
  async login({ commit }, userInfo) {
    // 解构出用户名与密码
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    // 注意：当前登录请求现在使用的是mock数据，mock数据code是20000
    // console.log(result);
    if(result.code == 20000){
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  // get user info
  async getInfo({ commit, state }) {
      let result = await getInfo(state.token)
      // console.log(result)
      if(result.code == 20000){
        // console.log(111);
        const {data} = result;
        // Vuex存储用户全部信息
        commit('SET_USERINFO',data);
        // console.log(commit);
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
      }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
// 两个数组进行对比，对比当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes,routes) => {
  // console.log(asyncRoutes,routes,'1111111111')
  // 过滤出当前用户【超级管理|普通员工】需要展示的异步路由
  return asyncRoutes.filter(item=>{
    // console.log(item);
    // 数组当中没有这个元素返回索引值-1，如果有这个元素，返回的索引值一定不是-1
    if(routes.indexOf(item.name)!=-1){
      // 递归:因为路由里面还可能包含二级、三级、四级等等路由
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes);
      }
      return true;
    }
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

