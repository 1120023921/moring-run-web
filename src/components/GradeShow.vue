<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <search v-if="searchShow" v-model="searchJobNumber" @on-submit="searchStudentGrade"></search>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      <!--{{$route.query.title}}-->
      {{title}}
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
        <tr v-for="(item,index) in value" :key="index" is-link>
          <td>{{(typeof (item.itemName)==='undefined'||item.itemName==='')?'未知':item.itemName}}</td>
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
  import {CellBox, Cell, Group, XHeader, XTable, LoadMore, Search} from 'vux'
  import API from '@/utils/api'
  import HeaderImg from '@/components/HeaderImg'
  import utils from '@/utils/utils'

  export default {
    name: "GradeShow",
    data() {
      return {
        gradeList: {},
        searchJobNumber: "",
        searchShow: false,
        searchStudentName: ""
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
        if (typeof (itemName) === 'undefined' || itemName === null || itemName === '') {
          return grade
        }
        if (itemName.indexOf("跑") > -1) {
          return grade.substring(3, 4) + '\'' + grade.substring(4, 6) + '\'\'' + grade.substring(6, 8)
        } else {
          if (grade.indexOf("-") > -1) {
            grade = grade.substring(grade.indexOf("-"))
          }
          return parseFloat(grade)
        }
      },
      getDate(dateTime) {
        return dateTime.substring(0, 10);
      },
      //管理员查询学生成绩
      searchStudentGrade() {
        let self = this;
        API.getGradeByJobNumberAndTypeByTeacher(self.searchJobNumber, this.$route.query.type)
          .then(res => {
            self.gradeList = utils.mapSortDesc(res.data.data);
            for (let i in res.data.data) {
              self.searchStudentName = res.data.data[i][0].name;
              break;
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      //是否是教师需要显示搜索框
      needShowSearch() {
        if (sessionStorage.getItem('roles') !== null) {
          let roles = JSON.parse(sessionStorage.getItem('roles'));
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].roid === 'admin' || roles[i].roid === 'teacher') {
              this.searchShow = true;
              break;
            }
          }
        }
      }
    },
    mounted() {
      this.needShowSearch();
      this.getGradeByJobNumberAndType();
    },
    computed: {
      title() {
        return (this.searchStudentName === '' ? sessionStorage.getItem('name') : this.searchStudentName) + this.$route.query.title;
      }
    },
    components: {
      CellBox, Cell, Group, XHeader, HeaderImg, XTable, LoadMore, Search
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
