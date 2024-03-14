import request from '@/utils/request'

// 查询用户信息列表
export function listStudent(query) {
  return request({
    url: '/college/student/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getStudent(userId) {
  return request({
    url: '/college/student/' + userId,
    method: 'get'
  })
}

// 新增用户信息
export function addStudent(data) {
  return request({
    url: '/college/student',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateStudent(data) {
  return request({
    url: '/college/student',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delStudent(userId) {
  return request({
    url: '/college/student/' + userId,
    method: 'delete'
  })
}
