import { api } from './config'
import axios from 'axios'

export function login(data) {
  const url = `${api}/sys/login`
  console.log(url)
  return axios.post(url, {
    username: data.username,
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
// 上架或下架会展 1
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
// 删除展会 1
export function deleteExhibition(id) {
  const url = `${api}/sys/deleteExhibition/${id}`
  return axios.delete(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 搜索工商 1
export function searchCompany(content) {
  const url = `${api}/search/searchCompany`
  return axios.get(url, {
    params: {
      content: content
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 搜索展会名称 1
export function searchExhibition(name) {
  // return service({
  //     url: `/search/searchExhibition`,
  //     method: "get",
  //     params: {
  //         name: name
  //     }
  // });
  const url = `${api}/search/searchExhibition`
  return axios.get(url, {
    params: {
      name: name
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 添加参展商或这到访商
export function addExhibitior(data) {
  const url = `${api}/sys/addExhibitior`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// /sys/getAllExhibitiors 获取全部的参展商或者到访商
export function getAllExhibitiors(exhibitionId, content, type) {
  const url = `${api}/sys/getAllExhibitiors`
  return axios.get(url, {
    params: {
      exhibitionId: exhibitionId,
      content: content,
      type: type
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除参展商 1
export function deleteExhibitior(id) {
  const url = `${api}/sys/deleteExhibitior/${id}`
  return axios.delete(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 根据行业和地区获取所有企业 1
export function getAllCompanyByIndustryAndArea(data) {
  const url = `${api}/sys/getAllCompanyByIndustryAndArea`
  return axios.get(url, {
    params: {
      firstIndustryId: data.firstIndustryId,
      secondIndustryId: data.secondIndustryId,
      area: data.area
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// /sys/pushExhibitionInfo 展会推送
export function pushExhibitionInfo(companyIds, exhibitionIds) {
  const url = `${api}/sys/pushExhibitionInfo`
  return axios.post(url, {
    companyIds: companyIds,
    exhibitionIds: exhibitionIds
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// /sys/pushCompany
// /sys/pushExhibitionInfo 展会推送
export function pushCompany(companyAdvertIds, companyIds) {
  const url = `${api}/sys/pushCompany`
  return axios.post(url, {
    companyAdvertIds: companyAdvertIds,
    companyIds: companyIds
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// /sys/pushExhibitionInfo 展会推送
export function recommendCompany(id, isRecommend) {
  const url = `${api}/sys/recommendCompany`
  return axios.get(url,
    {
      params: {
        id: id,
        isRecommend: isRecommend
      }
    }).then((res) => {
      return Promise.resolve(res.data)
    })
}
// 获取所有设计列表 /sys/getAllDemand
export function getAllDemand(data) {
  const url = `${api}/sys/getAllDemand`
  return axios.get(url, {
    params: {
      name: data.name,
      email: data.email,
      isConnected: data.isConnected,
      beginDate: data.beginDate,
      endDate: data.endDate,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// /sys/isConnected 已联系
export function isConnected(id) {
  const url = `${api}/sys/isConnected`
  return axios.get(url,
    {
      params: {
        id: id
      }
    }).then((res) => {
      return Promise.resolve(res.data)
    })
}
// 查看所有报名 /sys/getAllEnroll
export function getAllEnroll(data) {
  const url = `${api}/sys/getAllEnroll`
  return axios.get(url, {
    params: {
      companyName: data.companyName,
      name: data.name,
      mobile: data.mobile,
      title: data.title,
      beginDate: data.beginDate,
      endDate: data.endDate,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 认证企业 /sys/authenticateCompany
export function authenticateCompany(id, isAuthenticate) {
  const url = `${api}/sys/authenticateCompany`
  return axios.get(url,
    {
      params: {
        id: id,
        isAuthenticate: isAuthenticate
      }
    }).then((res) => {
      return Promise.resolve(res.data)
    })
}
// 获取系统日志
export function getAllLog(data) {
  const url = `${api}/sys/getAllLog`
  return axios.get(url, {
    params: {
      name: data.name,
      beginDate: data.beginDate,
      endDate: data.endDate,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除系统日志
export function deleteLog(date) {
  const url = `${api}/sys/deleteLog`
  return axios.get(url, {
    params: {
      date: date
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询全部角色
export function getRoles() {
  const url = `${api}/sys/getRoles`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 新增角色/role/addRole
export function addRole(data) {
  const url = `${api}/sys/addRole`
  return axios.post(url, {
    name: data.name,
    bannerData: data.bannerData,
    enterpriseData: data.enterpriseData,
    exhibitionData: data.exhibitionData,
    serviceData: data.serviceData,
    adminData: data.adminData,
    systemData: data.systemData,
    note: data.note,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询角色信息
export function getRoleById(id) {
  const url = `${api}/sys/getRoleById`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除角色信息
export function deleteRole(id) {
  const url = `${api}/sys/deleteRoleById/${id}`
  return axios.delete(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改角色信息
export function editRole(data) {
  const url = `${api}/sys/editRole`
  return axios.post(url, {
    name: data.name,
    bannerData: data.bannerData,
    enterpriseData: data.enterpriseData,
    exhibitionData: data.exhibitionData,
    serviceData: data.serviceData,
    adminData: data.adminData,
    systemData: data.systemData,
    note: data.note,
    id: data.id
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询全部管理员
export function getAllAdmin() {
  const url = `${api}/sys/getAllAdmin`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增管理员
export function addAdmin(data) {
  console.log(data)
  const url = `${api}/sys/addAdmin`
  return axios.post(url, {
    nickname: data.nickname,
    password: data.password,
    roleId: data.roleId,
    username: data.username
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询管理员
export function getAdminById(id) {
  const url = `${api}/sys/getAdminById`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改管理员
export function editAdmin(data) {
  const url = `${api}/sys/editAdmin`
  return axios.post(url, {
    id: data.id,
    roleId: data.roleId,
    nickname: data.nickname
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除管理员
export function deleteAdminById(id) {
  const url = `${api}/sys/deleteAdminById/${id}`
  return axios.delete(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取首页内容   /sys/indexInfo
export function indexInfo() {
  const url = `${api}/sys/indexInfo`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取行业列表
export function getIndustryByCondition(data) {
  const url = `${api}/back/getIndustryByCondition`
  return axios.get(url, {
    params: {
      state: data.state,
      name: data.name,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 新增行业名称
export function addIndustry(data) {
  const url = `${api}/back/addIndustry`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询一级行业
export function getIndustryDetail(id) {
  const url = `${api}/back/getIndustryDetail`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改一级行业
export function editIndustry(data) {
  const url = `${api}/back/editIndustry`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除行业
export function deleteIndustry(id) {
  const url = `${api}/back/deleteIndustry/${id}`
  return axios.delete(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 根据一级行业获取二级行业列表
export function getTwoLevelIndustry(id) {
  const url = `${api}/back/getTwoLevelIndustry`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}





// 获取行业列表

// 获取用户信息 
export function getCompanyInfo(userId, id) {
  const url = `${api}/user/getCompanyInfo`
  return axios.get(url, {
    params: {
      userId: userId,
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 新增企业
export function addNewCompany(data) {
  return axios({
    url: `${api}/sys/addNewCompany`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 修改用户信息 
export function addUserInfo(data) {
  return axios({
    url: `${api}/user/addUserInfo`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 冻结企业
export function freezeCompany(data) {
  console.log(data)
  return axios({
    url: `${api}/sys/freezeCompany`,
    method: 'post',
    data: data
  })
}
// // 导出报名列表
// export function exportEnrollExcel(data) {
//   const url = `${api}/sys/exportEnrollExcel`
//   console.log(data)
//   return axios.post(url, {
//     companyName: data.companyName,
//     name: data.name,
//     mobile: data.mobile,
//     title: data.title,
//     beginDate: data.beginDate,
//     endDate: data.endDate,
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

// 上传图片到OSS 
export function upload(data) {
  return axios({
    url: `${api}/user/upload`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 修改
export function updatePicture(data) {
  return axios({
    url: `${api}/user/updatePicture`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 新增
export function savePicture(data) {
  return axios({
    url: `${api}/user/savePicture`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
