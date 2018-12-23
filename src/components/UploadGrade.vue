<template>
  <div>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      成绩上传
    </div>
    <Group title="">
      <Selector title="学期" v-model="semester" placeholder="请选择学期" :options="semesterList"></Selector>
    </Group>
    <Group>
      <flexbox>
        <flexbox-item><label style="padding-left: 15px;">选择文件</label></flexbox-item>
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
  import {Selector, Group, Cell, CellBox, XButton, Flexbox, FlexboxItem} from 'vux'
  import API from '@/utils/api'

  export default {
    name: "UploadGrade",
    data() {
      return {
        semesterList: [1, 2],
        semester: "",
        files: []
      }
    },
    methods: {
      //选择文件
      getFile(e) {
        this.files = [];
        for (let i = 0; i < e.target.files.length; i++) {
          this.files.push(e.target.files[i])
        }
      },
      //成绩上传
      uploadGrade() {
        let formData = new FormData();
        formData.append('semester', this.semester);
        for (let i = 0; i < this.files.length; i++) {
          formData.append('multipartFiles', this.files[i]);
        }
        API.uploadGrade(formData)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          });
      }
    },
    mounted() {

    },
    components: {
      Group,
      Selector,
      Cell,
      CellBox,
      XButton, Flexbox, FlexboxItem
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
