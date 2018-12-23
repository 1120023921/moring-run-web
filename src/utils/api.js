import axios from '@/utils/request'
import CONSTANT from '@/utils/constant'

const API = {
  //获取体质测试成绩
  getGradeByJobNumberAndType(jobNumber, type) {
    return axios.postJson(CONSTANT.wxUrl + '/grade/getGradeByJobNumberAndType', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩
  getAttendanceVo(jobNumber, type) {
    return axios.postJson(CONSTANT.wxUrl + '/grade/getAttendanceVo', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩详情
  getAttendanceGradeDetail(jobNumber, type, itemNumber, semesterId) {
    return axios.postJson(CONSTANT.wxUrl + '/grade/getAttendanceGradeDetail', {
      jobNumber: jobNumber,
      type: type,
      itemNumber: itemNumber,
      semesterId: semesterId
    })
  },
  //绑定用户信息
  addUserOpenId(param) {
    return axios.patch('/user/addUserOpenId', param)
  },
  //上传成绩
  uploadGrade(formData) {
    return axios.uploadFile(CONSTANT.wxUrl + '/grade/importGrade', formData)
  }
}

export default API
