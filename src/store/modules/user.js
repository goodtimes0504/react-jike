// 和用户相关的状态管理
import { removeToken } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"
import { setToken as _setToken, getToken } from "@/utils"
import { loginAPI, getProfileAPI } from "@/apis/user"

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      //   localStorage也存一份
      _setToken(action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearUserInfo: (state) => {
      state.userInfo = {}
      // 清除token
      state.token = ""
      removeToken()
    },
  },
})
//解构出actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions
//获取reducer函数
const userReducer = userStore.reducer
//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
  }
}
//异步方法 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}
export { fetchLogin, setToken, fetchUserInfo, setUserInfo, clearUserInfo }
//userReducer
export default userReducer
