<template>
  <div>
    <XHeader>{{$route.query.title}}</XHeader>
    <!--<HeaderImg></HeaderImg>-->
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      {{$route.query.title}}
    </div>
    <Group>
      <Cell v-for="(item,index) in carouselList" :key="item.id" :title="item.title" is-link></Cell>
    </Group>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader} from 'vux'
  import API from '@/utils/api'
  import HeaderImg from '@/components/HeaderImg'

  export default {
    name: "CarouselList",
    data() {
      return {
        carouselList: []
      }
    },
    methods: {
      getAllCarousel() {
        let self = this;
        API.getAllCarousel()
          .then(res => {
            self.carouselList = res.data.data;
          })
          .catch(err => {
            console.log(err)
          });
      }
    },
    mounted() {
      this.getAllCarousel()
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
