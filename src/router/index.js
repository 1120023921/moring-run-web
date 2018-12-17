import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import GradeShow from '@/components/GradeShow'
import AttendanceGradeShow from '@/components/AttendanceGradeShow'
import AttendanceGradeDetailShow from '@/components/AttendanceGradeDetailShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/gradeShow',
      name: 'GradeShow',
      component: GradeShow
    },
    {
      path: '/attendanceGradeShow',
      name: 'AttendanceGradeShow',
      component: AttendanceGradeShow
    },
    {
      path: '/attendanceGradeDetailShow',
      name: 'AttendanceGradeDetailShow',
      component: AttendanceGradeDetailShow
    }
  ]
})
