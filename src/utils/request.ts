// 公用的请求
const baseUrl = 'https://meituan.thexxdd.cn/api/'
// 获取token// npm install --save js-base64
import { Base64 } from 'js-base64'
// 类型声明
import {
  Rescovidapi,
  Wxloginapi,
  Covidcancelapi,
  Hpvpriceapi,
  Reshpvapi,
  Resnuataapi,
  Patientres,
  Graphics,
  FilterData,
  PhyId,
  PhyRes,
  Regappoin
} from '@/@types/frontPage'

function getToken(): string {
  const token = uni.getStorageSync('wxuser').user_Token || ''
  const base64_token = Base64.encode(token + ':')
  return 'Basic ' + base64_token
}
// 请求
// 请求数据
function request<T>(
  url: string,
  method: 'GET' | 'POST',
  data: string | object | ArrayBuffer
): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method,
      data,
      header: { Authorization: getToken() },
      success: (res) => {
        if (res.statusCode == 200) {
          if (typeof res.data == 'object') {
            const data = Object.assign(res.data, { statusCode: res.statusCode })
            resolve(data as T)
          } else {
            resolve(res.data as T)
          }
        } else if (res.statusCode == 401) {
          // 没有权限访问接口:跳转到登陆界面
          uni.hideLoading()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else if (res.statusCode == 400) {
          uni.showToast({
            title: '开发者某个字段或参数填写不对',
            icon: 'none',
            duration: 1000
          })
          reject(res)
        } else if (res.statusCode == 500) {
          uni.showToast({
            title: '服务器发生未知错误',
            icon: 'none',
            duration: 1000
          })
          reject(res)
        } else if (res.statusCode == 202) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          uni.showToast({
            title: (res.data as any).msg,
            icon: 'none',
            duration: 1000
          })
          reject(res)
        } else {
          uni.showToast({
            title: '服务器发生未知错误',
            icon: 'none',
            duration: 1000
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '服务器发生未知错误',
          icon: 'none',
          duration: 1000
        })
        reject(err)
      }
    })
  })
}

// 接口
const RequestApi = {
  // 首页数据
  FrontPage: <T>() => request<T>('frontpage', 'GET', {}),
  // 新冠疫苗预约时段
  NewappTime: <T>() => request<T>('newapptime', 'GET', {}),
  // 新冠疫苗提交预约
  RescoVid: <T>(data: Rescovidapi) => request<T>('rescovid', 'POST', data),
  // 小程序登陆
  WxLogin: <T>(data: Wxloginapi) => request<T>('wx_login', 'POST', data),
  // 新冠疫苗预约订单
  CoviduserOrder: <T>() => request<T>('coviduser_order', 'GET', {}),
  // 取消新冠疫苗预约
  CovidCancel: <T>(data: Covidcancelapi) =>
    request<T>('covidcancel', 'GET', data),
  // HPV疫苗列表
  OtuHpv: <T>() => request<T>('otuhpv', 'GET', {}),
  // HPV疫苗套餐
  HpvPack: <T>() => request<T>('hpv_pack', 'GET', {}),
  // 查询HPV套餐价格
  HpvPrice: <T>(data: Hpvpriceapi) => request<T>('hpv_price', 'POST', data),
  // 提交HPV疫苗
  ResHpv: <T>(data: Reshpvapi) => request<T>('reshpv', 'POST', data),
  // HPV疫苗预约订单
  HpvuserOrder: <T>() => request<T>('hpvuser_order', 'GET', {}),
  // 取消HPV预约
  HpvCancel: <T>(data: Covidcancelapi) => request<T>('hpvcancel', 'GET', data),
  // 获取核酸检测页面数据
  NuataGet: <T>() => request<T>('nuataget', 'GET', {}),
  // 提交核酸检测预约
  ResNuata: <T>(data: Resnuataapi) => request<T>('resnuata', 'POST', data),
  // 核酸检测订单
  NuatauserOrder: <T>() => request<T>('nuatauser_order', 'GET', {}),
  // 取消核酸检测预约
  NuataCancel: <T>(data: Covidcancelapi) =>
    request<T>('nuatacancel', 'GET', data),
  // 获取就诊人信息
  GetpaTient: <T>() => request<T>('get_patient', 'GET', {}),
  // 提交就诊人
  PatientRes: <T>(data: Patientres) => request<T>('patient_res', 'POST', data),
  // 提交图文咨询
  GrapHics: <T>(data: Graphics) => request<T>('graphics', 'POST', data),
  // 获取体检筛选条件
  PhyTerm: <T>() => request<T>('phyterm', 'GET', {}),
  // 获取全部体检套餐
  PhySget: <T>() => request<T>('physget', 'GET', {}),
  // 查询筛选体检套餐
  PhyQuery: <T>(data: FilterData) => request<T>('phyquery', 'POST', data),
  // 体检套餐详情页数据
  PhydaTeil: <T>(data: PhyId) => request<T>('phydateil', 'GET', data),
  // 体检预约提交
  ResPhy: <T>(data: PhyRes) => request<T>('resphy', 'POST', data),
  //获取体检套餐订单
  PhyuserOrder: <T>() => request<T>('phyuser_order', 'GET', {}),
  // 24. 取消体检预约
  PhyCancel: <T>(data: Covidcancelapi) => request<T>('phycancel', 'GET', data),
  // 26. 获取抑郁症题目    GET    /depression_topics
  DepressionTopics: <T>() => request<T>('depression_topics', 'GET', {}),
  // 27. 抑郁症测试结果   GET   /depression?query=
  DepressiSon: <T>(data: { value: string[] }) =>
    request<T>('depression', 'GET', data),
  // 28. 获取早泄题目    GET   /premature_topics
  PrematureTopics: <T>() => request<T>('premature_topics', 'GET', {}),
  // 29. 早泄测试结果    GET   /premature?query=
  PremaTure: <T>(data: { value: string[] }) =>
    request<T>('premature', 'GET', data),
  // 30. 获取失眠题目    GET   /insomnia_topics
  InsomniaTopics: <T>() => request<T>('insomnia_topics', 'GET', {}),
  // 31. 失眠测试结果    GET   /insomnia?query=
  InsoMnia: <T>(data: { value: string[] }) =>
    request<T>('insomnia', 'GET', data),
  // 32. 获取短视频数据    GET   /video_list?query=
  VideoList: <T>(data: { page: number }) =>
    request<T>('video_list', 'GET', data),
  // 33. 获取父科室列表    GET    /department
  DeparTment: <T>() => request<T>('department', 'GET', {}),
  // 34. 获取父科室下的子科室   GET   /reglist?query=
  RegList: <T>(data: { id: string }) => request<T>('reglist', 'GET', data),
  // 35. 获取选择医生的日期    GET   /timesele?query=
  TimeSele: <T>(data: { dep_id: string }) =>
    request<T>('timesele', 'GET', data),
  // 36. 获取选择的科室下的全部医生列表     GET    /alldlist?query=
  AlldList: <T>(data: { dep_id: string }) =>
    request<T>('alldlist', 'GET', data),
  // 37. 根据时间筛选挂号医生    GET    /everydlist?query=
  EverydList: <T>(data: { dep_id: string; week: string }) =>
    request<T>('everydlist', 'GET', data),
  // 38. 挂号医生主页   GET   /doctorhome?query=
  DoctorHome: <T>(data: { _id: string }) =>
    request<T>('doctorhome', 'GET', data),
  // 39. 提交挂号预约   POST   /regappoin
  RegAppoin: <T>(data: Regappoin) => request<T>('regappoin', 'POST', data),
  // 40. 获取每个用户的挂号记录    GET    /user_registrat
  UserreGistrat: <T>() => request<T>('user_registrat', 'GET', {}),
  // 41. 取消预约挂号    GET   /regist_cancel?query=
  RegistCancel: <T>(data: { _id: string }) =>
    request<T>('regist_cancel', 'GET', data),
  // 获取天气
  WeaTher: <T>(data: { longitude: string; latitude: string }) =>
    request<T>('weather', 'GET', data),
  // 疫情数据
  EpidEmic: <T>(data: { cityName: string }) => request<T>('epidemic', 'GET', data)
}

// 图片上传接口
const IMAGEURL = baseUrl + 'upload_picture'
// 身份证识别
const AICARD = baseUrl + 'ai_card'

export { RequestApi, IMAGEURL, AICARD }
