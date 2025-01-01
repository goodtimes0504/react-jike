// 封装获取频道列表的逻辑
import { useState, useEffect } from "react"
import { getChannelsAPI } from "@/apis/article"
const useChannel = () => {
  // 获取所有列表 并return出去组件中要用到的数据
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  // 获取频道列表
  useEffect(() => {
    const getChannels = async () => {
      const res = await getChannelsAPI()
      setChannelList(res.data.channels)
    }
    getChannels()
  }, [])
  return { channelList }
}
export { useChannel }
