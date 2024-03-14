import request from '@/utils/request'

// 查询实习申请信息列表
export function listApply(query) {
  return request({
    url: '/college/apply/list',
    method: 'get',
    params: query
  })
}

// 查询实习申请信息详细
export function getApply(id) {
  return request({
    url: '/college/apply/' + id,
    method: 'get'
  })
}

// 新增实习申请信息
export function addApply(data) {
  return request({
    url: '/college/apply',
    method: 'post',
    data: data
  })
}

// 修改实习申请信息
export function updateApply(data) {
  return request({
    url: '/college/apply',
    method: 'put',
    data: data
  })
}

// 删除实习申请信息
export function delApply(id) {
  return request({
    url: '/college/apply/' + id,
    method: 'delete'
  })
}
