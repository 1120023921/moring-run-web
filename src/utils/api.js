import axios from '@/utils/request'
import qs from 'qs'

const API = {
  getGradeByJobNumberAndType(jobNumber, type) {
    return axios.post('/wx/auth/wxbe3c1744c0f71ab4/gradeView/getGradeByJobNumberAndType', {
      jobNumber: jobNumber,
      type: type
    })
  }
}

export default API
