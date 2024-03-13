import request from '@/utils/request'

// 查询实习考勤信息列表
export function listDaily(query) {
  return request({
    url: '/internship/daily/list',
    method: 'get',
    params: query
  })
}

// 查询实习考勤信息详细
export function getDaily(id) {
  return request({
    url: '/internship/daily/' + id,
    method: 'get'
  })
}

// 新增实习考勤信息
export function addDaily(data) {
  return request({
    url: '/internship/daily',
    method: 'post',
    data: data
  })
}

// 修改实习考勤信息
export function updateDaily(data) {
  return request({
    url: '/internship/daily',
    method: 'put',
    data: data
  })
}

// 删除实习考勤信息
export function delDaily(id) {
  return request({
    url: '/internship/daily/' + id,
    method: 'delete'
  })
}
