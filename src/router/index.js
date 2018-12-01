import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import GradeShow from '@/components/GradeShow'

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
    }
  ]
})
