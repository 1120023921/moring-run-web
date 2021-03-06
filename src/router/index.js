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
import CarouselUpdate from '@/components/CarouselUpdate'
import SemesterList from '@/components/SemesterList'
import SemesterUpdate from '@/components/SemesterUpdate'
import ExportGrade from '@/components/ExportGrade'
import UpdateGradeFromTmp from '@/components/UpdateGradeFromTmp'
import EyeUpdate from '@/components/EyeUpdate.vue'
import ReviewEye from '@/components/ReviewEye.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
    },
    {
      path: '/carouselUpdate',
      name: 'CarouselUpdate',
      component: CarouselUpdate
    },
    {
      path: '/semesterList',
      name: 'SemesterList',
      component: SemesterList
    },
    {
      path: '/semesterUpdate',
      name: 'SemesterUpdate',
      component: SemesterUpdate
    },
    {
      path: '/exportGrade',
      name: 'ExportGrade',
      component: ExportGrade
    },
    {
      path: '/updateGradeFromTmp',
      name: 'UpdateGradeFromTmp',
      component: UpdateGradeFromTmp
    },
    {
      path: '/eyeUpdate',
      name: 'EyeUpdate',
      component: EyeUpdate
    },
    {
      path: '/reviewEye',
      name: 'ReviewEye',
      component: ReviewEye
    }
  ]
})
