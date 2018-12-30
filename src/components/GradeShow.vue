<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{$route.query.title}}
    </div>
    <Group v-for="(value,key) in gradeList" :key="key" :title="key">
      <Cell v-for="(item,index) in value" :key="index" :title="item.itemName"
            :value="transferTime(item.grade,item.itemName)"></Cell>
    </Group>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader} from 'vux'
  import API from '@/utils/api'
  import HeaderImg from '@/components/HeaderImg'

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
            self.gradeList = res.data.data
          })
          .catch(err => {
            console.log(err)
          });
      },
      transferTime(grade, itemName) {
        if (itemName.indexOf("跑") > -1) {
          return grade.substring(3, 4) + '\'' + grade.substring(4, 6) + '\'\'' + grade.substring(6, 8)
        } else {
          return parseFloat(grade)
        }
      }
    },
    mounted() {
      this.getGradeByJobNumberAndType()
    },
    components: {
      CellBox, Cell, Group, XHeader, HeaderImg
    }
  }
</script>

<style scoped>
  .weui-cell {
    line-height: 0px;
    padding: 5px 15px;
  }
</style>
