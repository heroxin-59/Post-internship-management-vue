import request from '@/utils/request'

// 查询用户信息列表
export function listHead(query) {
  return request({
    url: '/company/head/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getHead(userId) {
  return request({
    url: '/company/head/' + userId,
    method: 'get'
  })
}

// 新增用户信息
export function addHead(data) {
  return request({
    url: '/company/head',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateHead(data) {
  return request({
    url: '/company/head',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delHead(userId) {
  return request({
    url: '/company/head/' + userId,
    method: 'delete'
  })
}
