<template>
  <div>
    <XHeader>{{title}}</XHeader>
    <HeaderImg></HeaderImg>
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
  import {CellBox, Cell, Group, Panel, XTable, XHeader} from 'vux'
  import HeaderImg from '@/components/HeaderImg'
  import utils from '@/utils/utils'


  export default {
    name: "AttendanceGradeDetailShow",
    data() {
      return {
        title: "",
        gradeList: []
      }
    },
    methods: {
      init() {
        this.title = this.$route.params.title
        this.gradeList = this.$route.params.data.sort(utils.compare("gradeCreateTime"));
      }
    },
    mounted() {
      this.init()
    },
    components: {
      CellBox, Cell, Group, Panel, XTable, XHeader, HeaderImg
    }
  }
</script>

<style scoped>

</style>
