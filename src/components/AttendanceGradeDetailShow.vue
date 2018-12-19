<template>
  <div>
    <Swiper :list="swiperList" @on-index-change=""></Swiper>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{title}}
    </div>
    <XTable :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr style="background-color: #F7F7F7">
        <th>序号</th>
        <th>有效次数</th>
        <th>考勤机</th>
        <th>刷卡时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in gradeList" :key="item.id">
        <td>{{gradeList.length-index}}</td>
        <td>{{item.grade}}</td>
        <td>{{item.deviceNumber}}</td>
        <td>{{item.gradeCreateTime}}</td>
      </tr>
      </tbody>
    </XTable>
    <!--<div>-->
    <!--<Panel :list="gradeList" type="4"></Panel>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {Swiper, CellBox, Cell, Group, Panel, XTable} from 'vux'
  import utils from '@/utils/utils'

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
        this.gradeList = this.$route.params.data.sort(utils.compare("gradeCreateTime"));
      }
    },
    mounted() {
      this.init()
    },
    components: {
      Swiper, CellBox, Cell, Group, Panel, XTable
    }
  }
</script>

<style scoped>

</style>
