<template>
  <div>
    <XHeader>成绩上传</XHeader>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      成绩上传
    </div>
    <Group title="">
      <Selector title="学期" v-model="semester" placeholder="请选择学期" :options="semesterList"></Selector>
    </Group>
    <Group>
      <flexbox>
        <flexbox-item><label style="padding-left: 15px;">文件</label></flexbox-item>
        <flexbox-item :span="5"><label style="padding-left: 15px;">已选择{{fileNum}}个文件</label></flexbox-item>
        <flexbox-item :span="4"><label class="ui-upload">选择文件<input type="file" @change="getFile" style="display: none;"
                                                                    multiple/></label>
        </flexbox-item>
      </flexbox>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="uploadGrade" type="primary">确定</XButton>
    </div>
  </div>
</template>

<script>
  import {Selector, Group, Cell, CellBox, XButton, Flexbox, FlexboxItem, XHeader} from 'vux'
  import API from '@/utils/api'
  import utils from '@/utils/utils'

  export default {
    name: "UploadGrade",
    data() {
      return {
        semesterList: [],
        semester: "",
        files: [],
        fileNum: 0
      }
    },
    methods: {
      //获取所有学期信息
      getAllSemester() {
        let self = this;
        API.getAllSemester()
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              for (let i = 0; i < res.data.data.length; i++) {
                let semester = {
                  key: res.data.data[i].id,
                  value: res.data.data[i].semester
                }
                self.semesterList.push(semester)
              }
            }
          })
          .catch(err => {
            self.$vux.toast.show({
              text: '服务器不小心抖了一下，稍后再来吧',
              type: 'warn'
            })
          })
      },
      //选择文件
      getFile(e) {
        if (e.target.files.length > 5) {
          this.$vux.toast.show({
            text: '一次最多上传5个文件',
            type: 'warn'
          })
          return;
        }
        this.files = [];
        for (let i = 0; i < e.target.files.length; i++) {
          this.files.push(e.target.files[i])
        }
        this.fileNum = this.files.length
      },
      //成绩上传
      uploadGrade() {
        let self = this;
        if (self.semester === '') {
          self.$vux.toast.show({
            text: '请选择学期',
            type: 'warn'
          })
          return;
        } else if (self.files.length <= 0) {
          self.$vux.toast.show({
            text: '请选择文件',
            type: 'warn'
          })
          return;
        }
        let formData = new FormData();
        formData.append('semester', self.semester);
        for (let i = 0; i < self.files.length; i++) {
          formData.append('multipartFiles', self.files[i]);
        }
        self.$vux.loading.show({
          text: '上传成绩中'
        })
        API.uploadGrade(formData)
          .then(res => {
            if (res.data.data) {
              self.$vux.loading.hide();
              self.$vux.toast.show({
                text: '上传成功',
                type: 'success'
              })
              location.reload();
            } else {
              self.$vux.loading.hide();
              self.$vux.toast.show({
                text: res.data.msg,
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
      }
    },
    mounted() {
      this.getAllSemester();
    },
    components: {
      Group,
      Selector,
      Cell,
      CellBox,
      XButton, Flexbox, FlexboxItem, XHeader
    }
  }
</script>

<style scoped>
  .ui-upload {
    height: 30px;
    width: 80px;
    background-color: #00abff;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    margin-left: 20px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
