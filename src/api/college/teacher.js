import request from '@/utils/request'

// 查询用户信息列表
export function listTeacher(query) {
  return request({
    url: '/college/teacher/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getTeacher(userId) {
  return request({
    url: '/college/teacher/' + userId,
    method: 'get'
  })
}

// 新增用户信息
export function addTeacher(data) {
  return request({
    url: '/college/teacher',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateTeacher(data) {
  return request({
    url: '/college/teacher',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delTeacher(userId) {
  return request({
    url: '/college/teacher/' + userId,
    method: 'delete'
  })
}
