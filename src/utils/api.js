import axios from '@/utils/request'
import qs from 'qs'

const API = {
  //获取体质测试成绩
  getGradeByJobNumberAndType(jobNumber, type) {
    return axios.post('/grade/getGradeByJobNumberAndType', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩
  getAttendanceVo(jobNumber, type) {
    return axios.post('/grade/getAttendanceVo', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩详情
  getAttendanceGradeDetail(jobNumber, type, itemNumber, semesterId) {
    return axios.post('/grade/getAttendanceGradeDetail', {
      jobNumber: jobNumber,
      type: type,
      itemNumber: itemNumber,
      semesterId: semesterId
    })
  }
}

export default API
