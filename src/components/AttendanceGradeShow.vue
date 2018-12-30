<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{$route.query.title}}
    </div>
    <Group v-for="(value,key) in gradeList" :key="key" :title="key">
      <Cell style="line-height:0px;padding: 5px 15px;" v-for="(item,index) in value" :key="index" :title="item.itemName"
            :value="item.grade" is-link
            @click.native="getAttendanceGradeDetail(item.semesterId,item.type,item.itemNumber,item.itemName)"></Cell>
    </Group>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader} from 'vux'
  import API from '@/utils/api'
  import AttendanceGradeDetailShow from '@/components/AttendanceGradeDetailShow'
  import HeaderImg from '@/components/HeaderImg'

  export default {
    name: "AttendanceGradeShow",
    data() {
      return {
        gradeList: {}
      }
    },
    methods: {
      getAttendanceVo() {
        let self = this;
        API.getAttendanceVo(sessionStorage.getItem('jobNumber'), this.$route.query.type)
          .then(res => {
            self.gradeList = res.data.data
          })
          .catch(err => {
            console.log(err)
          });
      },
      getAttendanceGradeDetail(semesterId, type, itemNumber, itemName) {
        let self = this;
        API.getAttendanceGradeDetail(sessionStorage.getItem('jobNumber'), type, itemNumber, semesterId)
          .then(res => {
            self.$router.push({
              name: 'AttendanceGradeDetailShow',
              params: {
                data: res.data.data,
                title: itemName
              }
            })
          })
          .catch(err => {
            console.log(err)
          });
      }
    },
    mounted() {
      this.getAttendanceVo()
    },
    components: {
      CellBox, Cell, Group, AttendanceGradeDetailShow, XHeader, HeaderImg
    }
  }
</script>

<style scoped>

</style>
