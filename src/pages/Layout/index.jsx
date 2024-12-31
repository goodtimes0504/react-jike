import { Layout, Menu, message, Popconfirm } from "antd"
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import "./index.scss"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { clearUserInfo, fetchUserInfo, setUserInfo } from "@/store/modules/user"
import { useDispatch, useSelector } from "react-redux"
import { removeToken, setToken } from "@/utils"

const { Header, Sider } = Layout

const items = [
  {
    label: "首页",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (e) => {
    const path = e.key
    navigate(path)
  }
  const selectedKey = useLocation().pathname
  // 触发个人信息action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  const userInfo = useSelector((state) => state.user.userInfo)
  // 退出登录确认回调
  const onConfirm = () => {
    //提示并 跳转到登录页
    message.success("退出成功")
    dispatch(clearUserInfo())
    navigate("/login")
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined />
              退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={[{ selectedKey }]}
            selectedKeys={[selectedKey]}
            onClick={onMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
