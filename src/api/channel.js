/**
 * 获取用户频道列表
 * 如果登录了：获取用户频道列表
 * 没有登录：获取默认推荐的频道列表
 */
import request from '@/utils/request'

export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
