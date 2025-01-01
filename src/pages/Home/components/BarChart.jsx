//柱状图组件 功能代码都放到这里 把可变部分抽象成prop参数
import * as echarts from "echarts"

import { useEffect, useRef } from "react"
const BarChart = ({ title }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. 获取图表实例，如果已存在则销毁
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart) {
      myChart.dispose()
    }
    // 保证dom可用之后才进行图表的渲染
    // 获取渲染图标的dom节点
    // const chartDom = document.getElementById("main")
    const chartDom = chartRef.current
    // 初始化echarts 生成图标实例对象
    myChart = echarts.init(chartDom)
    // 定义option 准备图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["vue", "react", "angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    }
    // 如果实例对象存在 则使用option参数 完成图表的渲染
    option && myChart.setOption(option)
    // 5. 组件卸载时清理
    return () => {
      myChart && myChart.dispose()
    }
  }, [title])

  return <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>
}

export default BarChart
