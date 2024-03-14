import request from '@/utils/request'

// 查询实习成绩信息列表
export function listGrades(query) {
  return request({
    url: '/college/grades/list',
    method: 'get',
    params: query
  })
}

// 查询实习成绩信息详细
export function getGrades(id) {
  return request({
    url: '/college/grades/' + id,
    method: 'get'
  })
}

// 新增实习成绩信息
export function addGrades(data) {
  return request({
    url: '/college/grades',
    method: 'post',
    data: data
  })
}

// 修改实习成绩信息
export function updateGrades(data) {
  return request({
    url: '/college/grades',
    method: 'put',
    data: data
  })
}

// 删除实习成绩信息
export function delGrades(id) {
  return request({
    url: '/college/grades/' + id,
    method: 'delete'
  })
}
