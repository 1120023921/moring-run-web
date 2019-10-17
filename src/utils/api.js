import axios from '@/utils/request'

const API = {
  //获取体质测试成绩
  getGradeByJobNumberAndType(jobNumber, type) {
    return axios.postJson('/grade/getGradeByJobNumberAndType', {
      jobNumber: jobNumber,
      type: type
    })
  },
  //老师获取体质测试成绩
  getGradeByJobNumberAndTypeByTeacher(jobNumber, type) {
    return axios.postJson('/grade/getGradeByJobNumberAndTypeByTeacher', {
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
  //老师获取体教考勤成绩
  getAttendanceVoByTeacher(jobNumber, type) {
    return axios.postJson('/grade/getAttendanceVoByTeacher', {
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
  //教师获取体教考勤成绩详情
  getAttendanceGradeDetailByTeacher(jobNumber, type, itemNumber, semesterId) {
    return axios.postJson('/grade/getAttendanceGradeDetailByTeacher', {
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
  getAllCarousel() {
    return axios.getJson('/carousel/findAll', null)
  },
  //根据id获取轮播信息
  getCarouselById(id) {
    return axios.get('/carousel/getCarouselById', {id: id})
  },
  //更新轮播信息
  updateCarousel(formData) {
    return axios.uploadFilePatch('/carousel/updateCarousel', formData)
  },
  //新增轮播信息
  uploadCarousel(formData) {
    return axios.uploadFile('/carousel/uploadCarousel', formData)
  },
  //删除轮播信息
  deleteCarousel(id) {
    return axios.delete('/carousel/deleteCarouselById/' + id)
  },
  getTSUserWithRoles(id) {
    return axios.get('/tSUser/getTSUserWithRoles/' + id, {})
  },
  //根据id获取轮播信息
  getSemesterById(id) {
    return axios.get('/semester/getSemesterById', {id: id})
  },
  //新增学期
  insertSemester(param) {
    return axios.postJson('/semester/insertSemester', param);
  },
  //删除学期信息
  deleteSemester(id) {
    return axios.delete('/semester/deleteSemesterById/' + id)
  },
  //修改学期信息
  updateSemester(param) {
    return axios.patchJson('/semester/updateSemester', param)
  },
  //获取今日访问量
  getTodayLogNum() {
    return axios.getJson('/logInfo/getTodayLogNum')
  },
  //获取总访问量
  getAllLogNum() {
    return axios.getJson('/logInfo/getAllLogNum')
  },
  //导出学生成绩
  exportGrade(semesterId, fileName) {
    return axios.downloadFile('/grade/exportGrade', {semesterId: semesterId}, fileName)
  },
  //手动更新成绩
  updateGradeFromTmp() {
    return axios.get('/grade/updateGradeFromTmp', {})
  },
  //用户获取自己视力信息
  getUserEye(jobNumber) {
    return axios.get('/eye/getUserEye', {jobNumber: jobNumber})
  },
  //上报/更新设备信息
  insertEye(params) {
    return axios.postJson('/eye/insertEye', params)
  }
};

export default API
