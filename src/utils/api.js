import axios from '@/utils/request'

const API = {
  //获取体质测试成绩
  getGradeByJobNumberAndType(jobNumber, type) {
    return axios.postJson('/grade/getGradeByJobNumberAndType', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩
  getAttendanceVo(jobNumber, type) {
    return axios.postJson('/grade/getAttendanceVo', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩详情
  getAttendanceGradeDetail(jobNumber, type, itemNumber, semesterId) {
    return axios.postJson('/grade/getAttendanceGradeDetail', {
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
    return axios.uploadFile('/grade/importGrade', formData)
  },
  //获取所有学期信息
  getAllSemester() {
    return axios.getJson('/semester/findAll', null)
  },
  //上传学生信息
  uploadStudentInfo(formData) {
    return axios.uploadFile('/user/importStudentInfo', formData)
  },
  //获取所有轮播信息
  getAllCarousel(){
    return axios.getJson('/carousel/findAll', null)
  }
}

export default API
