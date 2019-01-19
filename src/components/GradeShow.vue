<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{$route.query.title}}
    </div>
    <div v-for="(value,key) in gradeList" :key="key" :title="key">
      <load-more :tip="key" :show-loading="false" background-color="#fbf9fe"></load-more>
      <XTable :cell-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th>项目名称</th>
          <th>成绩</th>
          <th>测试时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in value" :key="index">
          <td>{{item.itemName}}</td>
          <td>{{transferName(item.grade,item.itemName)}}</td>
          <td>{{getDate(item.gradeCreateTime)}}</td>
        </tr>
        </tbody>
      </XTable>
    </div>
    <div class="copyright">
      <span>本站查询仅供参考，最后评定成绩数据以文体部服务器为准</span>
    </div>
    <!--<Group v-for="(value,key) in gradeList" :key="key" :title="key">-->
      <!--<Cell v-for="(item,index) in value" :key="index" :title="item.itemName"-->
            <!--:value="transferName(item.grade,item.itemName)"></Cell>-->
    <!--</Group>-->
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader, XTable, LoadMore} from 'vux'
  import API from '@/utils/api'
  import HeaderImg from '@/components/HeaderImg'
  import utils from '@/utils/utils'

  export default {
    name: "GradeShow",
    data() {
      return {
        gradeList: {}
      }
    },
    methods: {
      getGradeByJobNumberAndType() {
        let self = this;
        API.getGradeByJobNumberAndType(sessionStorage.getItem('jobNumber'), this.$route.query.type)
          .then(res => {
            self.gradeList = utils.mapSortDesc(res.data.data)
          })
          .catch(err => {
            console.log(err)
          });
      },
      transferName(grade, itemName) {
        if (itemName.indexOf("跑") > -1) {
          return grade.substring(3, 4) + '\'' + grade.substring(4, 6) + '\'\'' + grade.substring(6, 8)
        } else {
          return parseFloat(grade)
        }
      },
      getDate(dateTime) {
        return dateTime.substring(0, 10);
      }
    },
    mounted() {
      this.getGradeByJobNumberAndType()
    },
    components: {
      CellBox, Cell, Group, XHeader, HeaderImg, XTable, LoadMore
    }
  }
</script>

<style scoped>
  .weui-cell {
    line-height: 0px;
    padding: 5px 15px;
  }
  .copyright {
    text-align: center;
    margin-top: 5%;
    color: #CCCCCC;
    font-size: 12px;
  }
</style>
