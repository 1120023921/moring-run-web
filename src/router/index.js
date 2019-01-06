import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import GradeShow from '@/components/GradeShow'
import AttendanceGradeShow from '@/components/AttendanceGradeShow'
import AttendanceGradeDetailShow from '@/components/AttendanceGradeDetailShow'
import BindInfo from '@/components/BindInfo'
import UploadGrade from '@/components/UploadGrade'
import HeaderImg from '@/components/HeaderImg'
import UploadStudentInfo from '@/components/UploadStudentInfo'
import CarouselList from '@/components/CarouselList'

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
    },
    {
      path: '/bindInfo',
      name: 'BindInfo',
      component: BindInfo
    },
    {
      path: '/uploadGrade',
      name: 'UploadGrade',
      component: UploadGrade
    },
    {
      path: '/headerImg',
      name: 'HeaderImg',
      component: HeaderImg
    },
    {
      path: '/uploadStudentInfo',
      name: 'UploadStudentInfo',
      component: UploadStudentInfo
    },
    {
      path: '/carouselList',
      name: 'CarouselList',
      component: CarouselList
    }
  ]
})
