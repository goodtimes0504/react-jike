import "./index.scss"
import { Card, Form, Input, Button, message } from "antd"
import logo from "@/assets/logo.png"
import { fetchLogin } from "@/store/modules/user"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    // 触发异步action fetchLogin 因为是异步的 所以需要使用await
    await dispatch(fetchLogin(values))
    // 跳转到首页
    navigate("/")
    // 提示一下用户登录成功
    message.success("登录成功")
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name="mobile"
            // 表单验证规则是串行执行，第一条通过之后再校验第二条
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号格式",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
              {
                pattern: /^[0-9]{6}$/,
                message: "请输入正确的6位验证码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
