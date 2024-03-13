import request from '@/utils/request'

// 查询实习信息发布列表
export function listInformation(query) {
  return request({
    url: '/internship/information/list',
    method: 'get',
    params: query
  })
}

// 查询实习信息发布详细
export function getInformation(id) {
  return request({
    url: '/internship/information/' + id,
    method: 'get'
  })
}

// 新增实习信息发布
export function addInformation(data) {
  return request({
    url: '/internship/information',
    method: 'post',
    data: data
  })
}

// 修改实习信息发布
export function updateInformation(data) {
  return request({
    url: '/internship/information',
    method: 'put',
    data: data
  })
}

// 删除实习信息发布
export function delInformation(id) {
  return request({
    url: '/internship/information/' + id,
    method: 'delete'
  })
}
