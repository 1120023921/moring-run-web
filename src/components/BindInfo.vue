<template>
  <div>
    <XHeader>绑定信息</XHeader>
    <Swiper :list="swiperList" @on-index-change=""></Swiper>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      绑定信息
    </div>
    <Group>
      <XInput title="学号" name="username" placeholder="请输入学号" v-model="param.jobNumber"></XInput>
      <XInput title="密码" name="username" placeholder="身份证后六位" type="password" v-model="param.password"></XInput>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="submitBindInfo" type="primary">确定</XButton>
    </div>
  </div>
</template>

<script>
  import {Grid, GridItem, Swiper, Group, Cell, XInput, XButton, XHeader} from 'vux'
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
    name: 'Index',
    data() {
      return {
        swiperList: swiperList,
        param: {
          jobNumber: "",
          password: "",
          token: this.$route.query.token
        },
        msgShow: false,
        msg: ""
      }
    },
    methods: {
      submitBindInfo() {
        let self = this
        API.addUserOpenId(this.param)
          .then(res => {
            if (res.data.code === 200) {
              self.$vux.toast.show({
                text: '绑定成功',
                type: 'success'
              })
              self.$router.push({
                name: "Index",
                query: {
                  jobNumber: this.param.jobNumber
                }
              })
            } else {
              this.$vux.toast.show({
                text: res.data.msg,
                type: 'warn'
              })
            }
          })
          .catch(err => {
            console.log(err)
          });
      }
    },
    mounted() {

    },
    components: {
      Grid, GridItem, Swiper, Group, Cell, XInput, XButton, XHeader
    },
  }
</script>

<style scoped>

</style>
