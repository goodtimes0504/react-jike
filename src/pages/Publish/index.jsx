// 导入所需的组件和样式
import {
  Card, // 卡片容器组件
  Breadcrumb, // 面包屑导航组件
  Form, // 表单组件
  Button, // 按钮组件
  Radio, // 单选框组件
  Input, // 输入框组件
  Upload, // 上传组件
  Space, // 间距组件
  Select,
  message, // 下拉选择组件
} from "antd"
import { PlusOutlined } from "@ant-design/icons" // 加号图标
import { Link, useNavigate, useSearchParams } from "react-router-dom" // 路由链接组件
import "./index.scss" // 导入样式文件
// 导入富文本编辑器
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useEffect, useRef, useState } from "react"
import {
  createArticleAPI,
  getArticleByIdAPI,
  updateArticleAPI,
} from "@/apis/article"
import { useChannel } from "@/hooks/useChannel"

// 从 Select 组件中解构出 Option 子组件
const { Option } = Select

// 定义发布文章组件
const Publish = () => {
  const quillRef = useRef(null)
  const { channelList } = useChannel()
  const navigate = useNavigate()
  // 提交表单
  const onFinish = async (formValues) => {
    // console.log(formValues)
    // 按照接口要求 处理表单数据
    if (imageList.length !== imageType) {
      message.warning(
        "封面数量和封面类型不匹配，当前封面类型为" + imageType + "张"
      )
      return
    }
    const reqData = {
      ...formValues,
      cover: {
        type: imageType, //当前封面模式
        // 这里只是对新增图片的处理逻辑 编辑的时候需要做另外处理
        images: imageList.map((item) => {
          if (item.response) {
            // 因为图片列表里新上传的 和编辑的数据结构不一样
            // 所以需要做判断 新上传的图片 有response 属性
            return item.response.data.url
          }
          // 编辑的时候(回填的图片) 图片列表里没有response 属性
          return item.url
        }), //图片列表 上传前确保和后端要求的格式一致
      },
    }
    // 调用接口 提交文章
    //根据articleId 判断是新增文章 还是编辑文章
    // 如果是新增文章 则调用createArticleAPI
    // 如果是编辑文章 则调用updateArticleAPI
    if (articleId) {
      const res = await updateArticleAPI(articleId, reqData)
      if (res.message === "OK") {
        message.success("文章修改成功")
        // 跳转到文章列表页
        navigate("/article", { replace: true })
      }
    } else {
      const res = await createArticleAPI(reqData)
      if (res.message === "OK") {
        message.success("文章发布成功")
        // 跳转到文章列表页
        navigate("/article", { replace: true })
      }
    }
  }
  // 上传图片
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    // 这里需要处理新旧图片数据结构的统一
    const fileList = value.fileList.map((file) => {
      if (file.response) {
        // 新上传图片
        return {
          url: file.response.data.url,
        }
      }
      // 回填图片
      return file
    })
    setImageList(fileList)
  }
  // 切换封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }
  //如果路径跟着id 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get("id")
  // 获取form实例 这是 antd 的 Form 组件提供的一个 Hook API：Form.useForm()
  const [form] = Form.useForm()
  useEffect(() => {
    const getArticleById = async () => {
      const res = await getArticleByIdAPI(articleId)
      // 为什么form.setFieldsValue(res.data) 可以回填部分数据
      // 因为form.setFieldsValue 是 antd 的 Form 组件提供的一个 Hook API：Form.useForm()
      // 它可以根据接口返回的数据 回填部分数据
      // 但是 回填数据 需要和表单的name 属性一致
      //比如 set方法需要{type:3}这种数据 但是返回的接口里的数据里是cover.type所以需要处理才能正确回填
      setImageType(res.data.cover.type)
      form.setFieldsValue({ ...res.data, type: res.data.cover.type })
      // 回填图片
      setImageList(
        res.data.cover.images.map((url) => {
          return {
            url,
          }
        })
      )
    }
    // 如果articleId 存在 则获取文章详情
    if (articleId) {
      getArticleById()
    }
  }, [articleId, form])
  return (
    // 最外层容器，使用 publish 类名
    <div className="publish">
      {/* 使用 Card 组件包裹整个表单 */}
      <Card
        // Card 的标题部分：使用面包屑导航
        title={
          <Breadcrumb
            items={[
              // 首页链接
              { title: <Link to={"/"}>首页</Link> },
              // 当前页面标题
              { title: articleId ? "修改文章" : "发布文章" },
            ]}
          />
        }
      >
        {/* 表单组件 */}
        <Form
          labelCol={{ span: 4 }} // 标签列宽度占4格
          wrapperCol={{ span: 16 }} // 内容列宽度占16格
          initialValues={{ type: 0 }} // 表单初始值
          onFinish={onFinish}
          form={form}
        >
          {/* 文章标题输入框 */}
          <Form.Item
            label="标题" // 表单项标签
            name="title" // 表单项名称
            rules={[
              // 校验规则
              { required: true, message: "请输入文章标题" }, // 必填项
            ]}
          >
            <Input
              placeholder="请输入文章标题" // 占位提示文字
              style={{ width: 400 }} // 设置宽度
            />
          </Form.Item>

          {/* 文章频道选择器 */}
          <Form.Item
            label="频道" // 表单项标签
            name="channel_id" // 表单项名称
            rules={[
              // 校验规则
              { required: true, message: "请选择文章频道" }, // 必填项
            ]}
          >
            <Select
              placeholder="请选择文章频道" // 占位提示文字
              style={{ width: 400 }} // 设置宽度
            >
              {/* 下拉选项 value属性在 用户选中之后会自动收集起来 作为接口的提交字段*/}
              {channelList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType 决定选择文件框的外观样式  showUploadList 是否显示上传列表
            action 上传的地址
            name 上传的参数名
            onChange 上传图片的回调函数
            点击图片上传到服务器 触发onChange 拿到上传后的图片展示地址 
            */}
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          {/* 文章内容编辑器 */}
          <Form.Item
            label="内容" // 表单项标签
            name="content" // 表单项名称
            rules={[
              // 校验规则
              { required: true, message: "请输入文章内容" }, // 必填项
            ]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
              ref={quillRef}
            />
          </Form.Item>

          {/* 表单按钮区域 */}
          <Form.Item
            wrapperCol={{ offset: 4 }} // 内容区域偏移4格
          >
            <Space>
              {" "}
              {/* 使用 Space 组件控制按钮之间的间距 */}
              <Button
                size="large" // 大号按钮
                type="primary" // 主要按钮样式
                htmlType="submit" // 提交表单类型
              >
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

// 导出组件
export default Publish
