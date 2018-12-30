<template>
  <div>
    <Swiper :list="swiperList" @on-index-change=""></Swiper>
  </div>
</template>

<script>
  import {Swiper} from 'vux'

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
    name: "HeaderImg",
    data() {
      return {
        swiperList: swiperList
      }
    },
    components: {
      Swiper
    }
  }
</script>

<style scoped>

</style>
