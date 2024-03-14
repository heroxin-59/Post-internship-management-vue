import request from '@/utils/request'

// 查询实习信息列表
export function listInformation(query) {
  return request({
    url: '/company/information/list',
    method: 'get',
    params: query
  })
}

// 查询实习信息详细
export function getInformation(id) {
  return request({
    url: '/company/information/' + id,
    method: 'get'
  })
}

// 新增实习信息
export function addInformation(data) {
  return request({
    url: '/company/information',
    method: 'post',
    data: data
  })
}

// 修改实习信息
export function updateInformation(data) {
  return request({
    url: '/company/information',
    method: 'put',
    data: data
  })
}

// 删除实习信息
export function delInformation(id) {
  return request({
    url: '/company/information/' + id,
    method: 'delete'
  })
}
