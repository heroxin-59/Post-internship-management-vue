import request from '@/utils/request'

// 查询实习总结信息列表
export function listSummary(query) {
  return request({
    url: '/internship/summary/list',
    method: 'get',
    params: query
  })
}

// 查询实习总结信息详细
export function getSummary(id) {
  return request({
    url: '/internship/summary/' + id,
    method: 'get'
  })
}

// 新增实习总结信息
export function addSummary(data) {
  return request({
    url: '/internship/summary',
    method: 'post',
    data: data
  })
}

// 修改实习总结信息
export function updateSummary(data) {
  return request({
    url: '/internship/summary',
    method: 'put',
    data: data
  })
}

// 删除实习总结信息
export function delSummary(id) {
  return request({
    url: '/internship/summary/' + id,
    method: 'delete'
  })
}
