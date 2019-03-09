<template>
  <div>
    <XHeader>更新成绩</XHeader>
    <div style="padding:15px;margin-top: 5%;">
      <XButton @click.native="updateGrade" type="primary">立即更新成绩</XButton>
    </div>
  </div>
</template>

<script>
  import API from '@/utils/api'
  import {CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton} from 'vux'

  export default {
    name: "UpdateGradeFromTmp",
    methods: {
      updateGrade() {
        let self = this;
        API.updateGradeFromTmp().then(res => {
          if (res.data.code >= 200 && res.data.code < 300) {
            self.$vux.toast.show({
              text: '更新成功',
              type: 'success'
            })
          } else {
            self.$vux.toast.show({
              text: res.data.data,
              type: 'warn'
            })
          }
        })
          .catch(err => {
            self.$vux.toast.show({
              text: '服务器不小心抖了一下，稍后再来吧',
              type: 'warn'
            })
          });
      }
    },
    components: {
      CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton
    }
  }
</script>

<style scoped>

</style>
