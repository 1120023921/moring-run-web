<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <search v-if="searchShow" v-model="searchJobNumber" :auto-fixed=false @on-submit="searchStudentGrade"></search>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      <!--{{$route.query.title}}-->
      {{title}}
    </div>
    <Group v-for="(value,key) in gradeList" :key="key" :title="key">
      <Cell style="line-height:0px;padding: 5px 15px;" v-for="(item,index) in value" :key="index" :title="item.itemName"
            :value="item.grade+'次'" is-link
            @click.native="getAttendanceGradeDetail(item.semesterId,item.type,item.itemNumber,item.itemName)"></Cell>
    </Group>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader, Search} from 'vux'
  import API from '@/utils/api'
  import AttendanceGradeDetailShow from '@/components/AttendanceGradeDetailShow'
  import HeaderImg from '@/components/HeaderImg'
  import utils from '@/utils/utils'

  export default {
    name: "AttendanceGradeShow",
    data() {
      return {
        gradeList: {},
        searchJobNumber: "",
        searchStudentName: "",
        searchShow: false
      }
    },
    methods: {
      getAttendanceVo() {
        let self = this;
        API.getAttendanceVo(sessionStorage.getItem('jobNumber'), this.$route.query.type)
          .then(res => {
            self.gradeList = utils.mapSortDesc(res.data.data)
          })
          .catch(err => {
            console.log(err)
          });
      },
      //管理员查询学生成绩
      searchStudentGrade() {
        let self = this
        self.searchStudentName = '';
        API.getAttendanceVoByTeacher(self.searchJobNumber, this.$route.query.type)
          .then(res => {
            self.gradeList = utils.mapSortDesc(res.data.data);
            if (location.hash.indexOf('searchJobNumber') === -1) {
              location.hash = location.hash + '&searchJobNumber=' + self.searchJobNumber;
            } else {
              location.hash = location.hash.substring(0, location.hash.indexOf('searchJobNumber')) + 'searchJobNumber=' + self.searchJobNumber;
            }
            for (let i in res.data.data) {
              self.searchStudentName = res.data.data[i][0].name;
              break;
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      getAttendanceGradeDetail(semesterId, type, itemNumber, itemName) {
        let self = this;
        if (typeof (this.$route.query.searchJobNumber) === 'undefined') {
          API.getAttendanceGradeDetail(sessionStorage.getItem('jobNumber'), type, itemNumber, semesterId)
            .then(res => {
              self.$router.push({
                name: 'AttendanceGradeDetailShow',
                query: {
                  data: res.data.data,
                  title: itemName,
                  searchJobNumber: self.searchJobNumber
                }
              })
            })
            .catch(err => {
              console.log(err)
            });
        } else {
          API.getAttendanceGradeDetailByTeacher(self.searchJobNumber, type, itemNumber, semesterId)
            .then(res => {
              self.$router.push({
                name: 'AttendanceGradeDetailShow',
                query: {
                  data: res.data.data,
                  title: itemName,
                  searchJobNumber: self.searchJobNumber
                }
              })
            })
            .catch(err => {
              console.log(err)
            });
        }
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
    computed: {
      title() {
        return (this.searchStudentName === '' ? sessionStorage.getItem('name') : this.searchStudentName) + this.$route.query.title;
      }
    },
    mounted() {
      if (typeof (this.$route.query.searchJobNumber) === 'undefined') {
        this.getAttendanceVo();
      } else {
        this.searchJobNumber = this.$route.query.searchJobNumber;
        this.searchStudentGrade();
      }
      this.needShowSearch();
    },
    components: {
      CellBox, Cell, Group, AttendanceGradeDetailShow, XHeader, HeaderImg, Search
    }
  }
</script>

<style scoped>

</style>
