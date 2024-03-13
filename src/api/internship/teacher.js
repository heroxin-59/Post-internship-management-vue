import request from '@/utils/request'

// 查询企业讲师信息列表
export function listTeacher(query) {
  return request({
    url: '/internship/teacher/list',
    method: 'get',
    params: query
  })
}

// 查询企业讲师信息详细
export function getTeacher(id) {
  return request({
    url: '/internship/teacher/' + id,
    method: 'get'
  })
}

// 新增企业讲师信息
export function addTeacher(data) {
  return request({
    url: '/internship/teacher',
    method: 'post',
    data: data
  })
}

// 修改企业讲师信息
export function updateTeacher(data) {
  return request({
    url: '/internship/teacher',
    method: 'put',
    data: data
  })
}

// 删除企业讲师信息
export function delTeacher(id) {
  return request({
    url: '/internship/teacher/' + id,
    method: 'delete'
  })
}
