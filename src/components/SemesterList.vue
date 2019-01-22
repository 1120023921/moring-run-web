<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <!--<HeaderImg></HeaderImg>-->
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{$route.query.title}}
    </div>
    <Group>
      <Cell v-for="(item,index) in semesterList" :key="item.id" :title="item.semester" is-link
            @click.native="updateSemester(item.id)"></Cell>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="updateSemester('')" type="primary">新增学期</XButton>
    </div>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader, XButton} from 'vux'
  import API from '@/utils/api'
  import HeaderImg from '@/components/HeaderImg'

  export default {
    name: "SemesterList",
    data() {
      return {
        semesterList: []
      }
    },
    methods: {
      getAllSemester() {
        let self = this;
        API.getAllSemester()
          .then(res => {
            self.semesterList = res.data.data;
          })
          .catch(err => {
            console.log(err)
          });
      },
      //跳转编辑页面
      updateSemester(id) {
        this.$router.push({
          name: 'SemesterUpdate',
          params: {
            id: id
          }
        })
      }
    },
    mounted() {
      this.getAllSemester()
    },
    components: {
      CellBox, Cell, Group, XHeader, HeaderImg, XButton
    }
  }
</script>

<style scoped>
  .weui-cell {
    line-height: 0;
    padding: 5px 15px;
  }
</style>
