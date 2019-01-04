<template>
  <div>
    <Swiper :list="swiperList"></Swiper>
  </div>
</template>

<script>
  import {Swiper} from 'vux'
  import API from '@/utils/api'

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
