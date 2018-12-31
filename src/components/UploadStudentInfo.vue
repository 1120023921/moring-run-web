<template>
  <div>
    <XHeader>学生信息上传</XHeader>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      学生信息上传
    </div>
    <Group>
      <flexbox>
        <flexbox-item>
          <label style="padding-left: 15px;">选择文件</label>
        </flexbox-item>
        <flexbox-item :span="4">
          <label class="ui-upload">选择文件<input type="file" @change="getFile" style="display: none;"/></label>
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

  export default {
    name: "UploadStudentInfo",
    data() {
      return {
        files: []
      }
    },
    methods: {
      //选择文件
      getFile(e) {
        this.files.push(e.target.files[0])
      },
      //成绩上传
      uploadGrade() {
        let self = this;
        if (self.files.length <= 0) {
          self.$vux.toast.show({
            text: '请选择文件',
            type: 'warn'
          })
          return;
        }
        let formData = new FormData();
        formData.append('multipartFile', self.files[0]);
        self.$vux.loading.show({
          text: '上传学生信息中'
        })
        API.uploadStudentInfo(formData)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.$vux.loading.hide();
              self.$vux.toast.show({
                text: '上传成功',
                type: 'success'
              })
              setTimeout(location.reload(),1000)
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
      }
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
