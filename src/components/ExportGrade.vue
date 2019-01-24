<template>
  <div>
    <XHeader>成绩导出</XHeader>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      成绩导出
    </div>
    <Group title="">
      <Selector title="学期" v-model="semester" placeholder="请选择学期" :options="semesterList"></Selector>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="exportGrade" type="primary">导出</XButton>
    </div>
  </div>
</template>

<script>
  import {Selector, Group, Cell, CellBox, XButton, XHeader} from 'vux'
  import axios from 'axios'
  import API from '@/utils/api'

  export default {
    name: "ExportGrade",
    data() {
      return {
        semesterList: [],
        semester: "",
        fileName: "学生成绩信息.xlsx"
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
                };
                self.semesterList.push(semester);
              }
              self.semester = self.semesterList[0].key;
            }
          })
          .catch(err => {
            self.$vux.toast.show({
              text: '服务器不小心抖了一下，稍后再来吧',
              type: 'warn'
            })
          })
      },
      //导出成绩
      exportGrade() {
        let self = this;
        self.$vux.loading.show({
          text: '导出成绩中'
        });
        return new Promise((resolve, reject) => {
          axios({
            method: 'GET',
            url: '/grade/exportGrade',
            params: {semesterId: self.semester},
            processData: false,
            contentType: false,
            timeout: 120000,
            responseType: 'arraybuffer'
          }).then(res => {
            self.$vux.loading.hide();
            let fileName = self.fileName;
            let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = self.fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          }).catch(err => {
            self.$vux.loading.hide();
            self.$vux.toast.show({
              text: '服务器不小心抖了一下，稍后再来吧',
              type: 'warn'
            })
          })
        })
      }
    },
    components: {
      Group,
      Selector,
      Cell,
      CellBox,
      XButton, XHeader
    },
    mounted() {
      this.getAllSemester();
    }
  }
</script>

<style scoped>

</style>
