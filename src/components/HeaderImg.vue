<template>
  <div>
    <Swiper :list="swiperList"></Swiper>
  </div>
</template>

<script>
  import {Swiper} from 'vux'
  import API from '@/utils/api'

  const swiperList = [{
    url: 'javascript:',
    img: 'https://pe-1252783006.cos.ap-guangzhou.myqcloud.com/carousel/4b0a6b6b-1af1-4925-9f7f-7c9ceee2f290.jpg',
    title: '送你一朵fua',
  }, {
    url: 'javascript:',
    img: 'https://pe-1252783006.cos.ap-guangzhou.myqcloud.com/carousel/5271daa0-9f1d-4874-8498-9b7670580fa2.jpg',
    title: '送你一辆车',
  }, {
    url: 'javascript:',
    img: 'https://pe-1252783006.cos.ap-guangzhou.myqcloud.com/carousel/5bfbe12a-ea91-458c-90c4-a2fd9f0adf0b.jpg',
    title: '送你一次旅行'
  }]
  export default {
    name: "HeaderImg",
    data() {
      return {
        swiperList: []
      }
    },
    methods: {
      getAllCarousel() {
        let self = this;
        API.getAllCarousel()
          .then(res => {
            let carouselList = res.data.data;
            let tmp = [];
            for (let i = 0; i < carouselList.length; i++) {
              let item = {
                url: carouselList[i].url,
                title: carouselList[i].title,
                img: carouselList[i].pic
              };
              tmp.push(item)
            }
            self.swiperList = tmp;
          })
          .catch(err => {
            console.log(err)
          });
      }
    },
    mounted(){
      this.getAllCarousel()
    },
    components: {
      Swiper
    }
  }
</script>

<style scoped>

</style>
