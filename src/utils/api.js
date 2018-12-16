import axios from '@/utils/request'
import qs from 'qs'

const API = {
  //获取体质测试成绩
  getGradeByJobNumberAndType(jobNumber, type) {
    return axios.post('/gradeView/getGradeByJobNumberAndType', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //获取体教考勤成绩
  getAttendanceVo(jobNumber, type) {
    return axios.post('/gradeView/getAttendanceVo', {
      jobNumber: jobNumber,
      type: type
    })
  }
}

export default API
