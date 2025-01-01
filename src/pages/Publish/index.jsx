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
  Select, // 下拉选择组件
} from "antd"
import { PlusOutlined } from "@ant-design/icons" // 加号图标
import { Link } from "react-router-dom" // 路由链接组件
import "./index.scss" // 导入样式文件
// 导入富文本编辑器
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

// 从 Select 组件中解构出 Option 子组件
const { Option } = Select

// 定义发布文章组件
const Publish = () => {
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
              { title: "发布文章" },
            ]}
          />
        }
      >
        {/* 表单组件 */}
        <Form
          labelCol={{ span: 4 }} // 标签列宽度占4格
          wrapperCol={{ span: 16 }} // 内容列宽度占16格
          initialValues={{ type: 1 }} // 表单初始值
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
              {/* 下拉选项 */}
              <Option value={0}>推荐</Option>
            </Select>
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
            {/* 富文本编辑器将在这里实现 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
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
