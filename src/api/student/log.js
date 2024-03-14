import request from '@/utils/request'

// 查询实习日志信息列表
export function listLog(query) {
  return request({
    url: '/student/log/list',
    method: 'get',
    params: query
  })
}

// 查询实习日志信息详细
export function getLog(id) {
  return request({
    url: '/student/log/' + id,
    method: 'get'
  })
}

// 新增实习日志信息
export function addLog(data) {
  return request({
    url: '/student/log',
    method: 'post',
    data: data
  })
}

// 修改实习日志信息
export function updateLog(data) {
  return request({
    url: '/student/log',
    method: 'put',
    data: data
  })
}

// 删除实习日志信息
export function delLog(id) {
  return request({
    url: '/student/log/' + id,
    method: 'delete'
  })
}
