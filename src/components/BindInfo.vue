<template>
  <div>
    <XHeader>绑定信息</XHeader>
    <HeaderImg></HeaderImg>
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
  import HeaderImg from '@/components/HeaderImg'

  export default {
    name: 'Index',
    data() {
      return {
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
              // window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0d2b18286906056&redirect_uri=http%3a%2f%2fdoublehh.cn%2fmorning-run%2fwx%2fauth%2fwxf0d2b18286906056%2flogin&response_type=code&scope=snsapi_userinfo&state=login#wechat_redirect';
              window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe3c1744c0f71ab4&redirect_uri=http%3a%2f%2fdoublehh.cn%3a8082%2fmorning-run%2fwx%2fauth%2fwxbe3c1744c0f71ab4%2flogin&response_type=code&scope=snsapi_userinfo&state=login#wechat_redirect';
            } else {
              this.$vux.toast.show({
                text: res.data.data,
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
      Grid, GridItem, Swiper, Group, Cell, XInput, XButton, XHeader, HeaderImg
    },
  }
</script>

<style scoped>

</style>
