<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <Swiper :list="swiperList" @on-index-change=""></Swiper>
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
  import {Swiper, CellBox, Cell, Group, XHeader} from 'vux'
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
    name: "GradeShow",
    data() {
      return {
        swiperList: swiperList,
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
      Swiper, CellBox, Cell, Group, XHeader
    }
  }
</script>

<style scoped>
  .weui-cell {
    line-height: 0px;
    padding: 5px 15px;
  }
</style>
