<template>
  <div>
    <Swiper :list="swiperList" @on-index-change=""></Swiper>
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
  import {Grid, GridItem, Swiper} from 'vux'
  import axios from '@/utils/request'

  const swiperList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua',
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车',
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg', // 404
    title: '送你一次旅行'
  }]
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
  }]
  export default {
    name: 'Index',
    data() {
      return {
        swiperList: swiperList,
        gridList: gridList,
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
      GridItem,
      Swiper,
    },
  }
</script>

<style scoped>

</style>
