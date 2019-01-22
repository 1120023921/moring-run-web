<template>
  <div>
    <XHeader>编辑学期</XHeader>
    <Group title="学期信息">
      <XInput title="标题" v-model="semester.semester"></XInput>
      <XInput title="排序" v-model="semester.weight" v-if="semester.id!==''"></XInput>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="submitInfo" type="primary">确定</XButton>
      <XButton @click.native="deleteSemester" type="warn" v-if="semester.id!==''">删除</XButton>
    </div>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton} from 'vux'
  import API from '@/utils/api'

  export default {
    name: "SemesterUpdate",
    data() {
      return {
        semester: {
          semester: "",
          id: "",
          weight: 0
        }
      }
    },
    methods: {
      //获取列表信息
      getSemesterById(id) {
        let self = this;
        API.getSemesterById(id).then(res => {
          if (res.data.code >= 200 && res.data.code < 300) {
            self.semester.semester = res.data.data.semester;
            self.semester.weight = res.data.data.weight;
          } else {
            self.$vux.loading.hide();
            self.$vux.toast.show({
              text: res.data.data,
              type: 'warn'
            })
          }
        })
          .catch(err => {
            self.$vux.loading.hide();
            self.$vux.toast.show({
              text: '服务器不小心抖了一下，稍后再来吧',
              type: 'warn'
            })
          });
      },
      //新增学期
      insertSemester() {
        let self = this;
        API.insertSemester(self.semester)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.$vux.toast.show({
                text: '新增成功',
                type: 'success'
              });
              window.history.back();
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
          })
      },
      //更新学期
      updateSemester() {
        let self = this;
        API.updateSemester(self.semester)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              window.history.back();
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
          })
      },
      //提交数据
      submitInfo() {
        if (this.semester.id === "") {
          this.insertSemester(this.semester);
        } else {
          this.updateSemester(this.semester);
        }
      },
      //删除学期
      deleteSemester() {
        let self = this;
        API.deleteSemester(self.semester.id)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.$vux.toast.show({
                text: '删除成功',
                type: 'success'
              });
              window.history.back();
            } else {
              self.$vux.toast.show({
                text: res.data.msg,
                type: 'warn'
              })
            }
          })
          .catch(err => {
            self.$vux.toast.show({
              text: '服务器不小心抖了一下，稍后再来吧',
              type: 'warn'
            })
          })
      }
    },
    mounted() {
      let id = this.$route.params.id;
      if (id) {
        this.semester.id = id;
        this.getSemesterById(this.semester.id);
      }
    },
    components: {
      CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton
    }
  }
</script>

<style scoped>

</style>
