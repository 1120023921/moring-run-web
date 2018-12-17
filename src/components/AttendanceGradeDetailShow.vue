<template>
  <div>
    <Swiper :list="swiperList" @on-index-change=""></Swiper>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{title}}
    </div>
    <div>
      <Panel :list="gradeList" type="4"></Panel>
    </div>
  </div>
</template>

<script>
  import {Swiper, CellBox, Cell, Group, Panel} from 'vux'
  import API from '@/utils/api'

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

  export default {
    name: "AttendanceGradeDetailShow",
    data() {
      return {
        title: "",
        swiperList: swiperList,
        gradeList: []
      }
    },
    methods: {
      init() {
        let data = this.$route.params.data;
        this.title = data[0].itemName
        for (let i = 0; i < data.length; i++) {
          let item = {
            title: data[i].itemName,
            desc: data[i].grade,
            meta: {
              source: '考勤机：' + data[i].deviceNumber,
              date: '时间：' + data[i].gradeCreateTime,
              // other: '学期：' + data[i].semester
            }
          }
          this.gradeList.push(item)
        }
      }
    },
    mounted() {
      this.init()
    },
    components: {
      Swiper, CellBox, Cell, Group, Panel
    }
  }
</script>

<style scoped>

</style>
