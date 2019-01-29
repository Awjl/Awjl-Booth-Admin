import { api } from './config'
import axios from 'axios'

export function login(data) {
  const url = `${api}/admin/login`
  console.log(url)
  return axios.post(url, {
    name: data.name,
    password: data.password
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}// 获取行业列表   1
export function getIndustry(Class) {
  const url = `${api}/industry/getIndustry`
  return axios.get(url, {
    params: {
      industryClass: Class
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
} 
// 添加广告 1
export function addAdvert(data) {
  return axios({
    url: `${api}/sys/addAdvert`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 修改广告 1
export function editAdvert(data) {
  return axios({
    url: `${api}/sys/editAdvert`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除广告 1
export function deletePointGoods(id) {
  const url = `${api}/sys/deleteAdvert/${id}`
  return axios.delete(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询广告详情
export function getAdvertById(id) {
  const url = `${api}/sys/getAdvertById`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取所有广告 1
export function getAllAdvert(data) {
  const url = `${api}/sys/getAllAdvert`
  return axios.get(url, {
    params: {
      title: data.title,
      firstIndustryId: data.firstIndustryId,
      secondIndustryId: data.secondIndustryId,
      area: data.area,
      isUpper: data.isUpper,
      beginDate: data.beginDate,
      endDate: data.endDate,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 上架或下架广告 1
export function isUpperAdvert(id, isUpper) {
  const url = `${api}/sys/isUpperAdvert`
  return axios.get(url, {
    params: {
      id: id,
      isUpper: isUpper
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取所有企业 1
export function getAllCompany(data) {
  const url = `${api}/sys/getAllCompany`
  return axios.get(url, {
    params: {
      name: data.name,
      email: data.email,
      firstIndustryId: data.firstIndustryId,
      secondIndustryId: data.secondIndustryId,
      isRecommend: data.isRecommend,
      isAuthenticate: data.isAuthenticate,
      beginDate: data.beginDate,
      endDate: data.endDate,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取所有会展 1
export function getAllExhibition(data) {
  const url = `${api}/sys/getAllExhibition`
  return axios.get(url, {
    params: {
      title: data.title,
      name: data.name,
      nameEng: data.nameEng,
      date: data.date,
      isUpper: data.isUpper,
      beginDate: data.beginDate,
      endDate: data.endDate,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// /sys/isUpperExhibition 上架或下架会展 1
export function isUpperExhibition(id, isUpper) {
  const url = `${api}/sys/isUpperExhibition`
  return axios.get(url, {
    params: {
      id: id,
      isUpper: isUpper
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 添加会展 1
export function addExhibition(data) {
  return axios({
    url: `${api}/sys/addExhibition`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 修改会展 1
export function editExhibition(data) {
  return axios({
    url: `${api}/sys/editExhibition`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 会展详情 /sys/getExhibitionById 1 /sys/editExhibition
export function getExhibitionById(id) {
  const url = `${api}/sys/getExhibitionById`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}