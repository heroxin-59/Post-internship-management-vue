import request from '@/utils/request'

// 查询实习生信息列表
export function listStudent(query) {
  return request({
    url: '/internship/student/list',
    method: 'get',
    params: query
  })
}

// 查询实习生信息详细
export function getStudent(id) {
  return request({
    url: '/internship/student/' + id,
    method: 'get'
  })
}

// 新增实习生信息
export function addStudent(data) {
  return request({
    url: '/internship/student',
    method: 'post',
    data: data
  })
}

// 修改实习生信息
export function updateStudent(data) {
  return request({
    url: '/internship/student',
    method: 'put',
    data: data
  })
}

// 删除实习生信息
export function delStudent(id) {
  return request({
    url: '/internship/student/' + id,
    method: 'delete'
  })
}
