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
        <td>{{getDate(item.gradeCreateTime)}}</td>
      </tr>
      </tbody>
    </XTable>
    <div class="copyright">
      <span>本站查询仅供参考，最后评定成绩数据以文体部服务器为准</span>
    </div>
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
        this.title = this.$route.query.title;
        this.gradeList = this.$route.query.data.sort(utils.compare("gradeCreateTime"));
      },
      getDate(dateTime) {
        return dateTime.substring(0, 10);
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
  .copyright {
    text-align: center;
    margin-top: 5%;
    color: #CCCCCC;
    font-size: 12px;
  }
</style>
