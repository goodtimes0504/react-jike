import { Link } from "react-router-dom"
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from "antd"
// 引入汉化包 让时间选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN"
// 导入资源
import { Table, Tag, Space } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import img404 from "@/assets/error.png"
import { useChannel } from "@/hooks/useChannel"
import { useEffect, useState } from "react"
import { getArticleListAPI } from "@/apis/article"

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel()
  // 准备列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        )
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      // render是antd的Table组件提供的 用于自定义列的渲染
      // data是后端返回的数据里的每一行的status 可以根据它做条件渲染
      // 0:草稿 1:待审核 2:审核通过 3:审核失败 4:已删除 不传默认为全部
      // 用枚举的方式 让状态更清晰
      render: (data) => {
        const statusMap = {
          0: { color: "blue", text: "草稿" },
          1: { color: "orange", text: "待审核" },
          2: { color: "green", text: "审核通过" },
          3: { color: "red", text: "审核失败" },
          4: { color: "gray", text: "已删除" },
        }
        return <Tag color={statusMap[data].color}>{statusMap[data].text}</Tag>
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      },
    },
  ]
  // 准备表格body数据
  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ]
  // 获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleListAPI()
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getArticleList()
  }, [])
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue=""
              style={{ width: 120 }}
            >
              {channelList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 准备表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  )
}

export default Article
