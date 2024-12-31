// 和用户相关的状态管理
import { request } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"
import { setToken as _setToken, getToken } from "@/utils"

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      //   localStorage也存一份
      _setToken(action.payload)
    },
  },
})
//解构出actionCreator
const { setToken } = userStore.actions
//获取reducer函数
const userReducer = userStore.reducer
//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm)
    dispatch(setToken(res.data.token))
  }
}
export { fetchLogin, setToken }
//userReducer
export default userReducer
