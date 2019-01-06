<template>
  <div>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      体育测试成绩查询
    </div>
    <grid :cols=3>
      <grid-item v-for="grid in gridList" @click.native="gradeShow(grid.type,grid.link,grid.label)" :key="grid.type"
                 :label="grid.label">
        <img slot="icon" :src="grid.src">
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import {Grid, GridItem} from 'vux'
  import HeaderImg from '@/components/HeaderImg'
  import axios from '@/utils/request'


  const gridList = [{
    url: '/',
    label: '体教考勤',
    type: '01',
    src: require('../assets/tjkq.png'),
    link: "AttendanceGradeShow"
  }, {
    label: '体质测试',
    type: '02',
    src: require('../assets/tzcs.png'),
    link: "GradeShow"
  }, {
    label: '技能考评',
    type: '03',
    src: require('../assets/jnkp.png'),
    link: "GradeShow"
  }, {
    label: '成绩上传',
    type: '04',
    src: require('../assets/upload.png'),
    link: "UploadGrade"
  }, {
    label: '学生信息上传',
    type: '05',
    src: require('../assets/upload.png'),
    link: "UploadStudentInfo"
  }, {
    label: '首页轮播管理',
    type: '06',
    src: require('../assets/upload.png'),
    link: "CarouselList"
  }]
  export default {
    name: 'Index',
    data() {
      return {
        gridList: gridList
      }
    },
    methods: {
      gradeShow(type, link, title) {
        this.$router.push({
          name: link,
          query: {
            type: type,
            title: title
          }
        })
      }
    },
    mounted() {
      sessionStorage.setItem('jobNumber', this.$route.query.jobNumber)
    },
    components: {
      Grid,
      GridItem, HeaderImg
    },
  }
</script>

<style scoped>

</style>
