<template>
  <div>
    <XHeader>编辑轮播</XHeader>
    <Group title="轮播信息">
      <XInput title="标题" v-model="title"></XInput>
      <XInput title="链接" v-model="url"></XInput>
      <XInput title="排序" v-model="weight" v-if="id!==''"></XInput>
    </Group>
    <Group>
      <flexbox>
        <flexbox-item>
          <label style="padding-left: 15px;">轮播图片</label>
        </flexbox-item>
        <flexbox-item :span="4">
          <label style="padding-left: 15px;"></label>
        </flexbox-item>
        <flexbox-item :span="4">
          <label class="ui-upload">选择图片<input type="file" @change="getFile" style="display: none;"/></label>
        </flexbox-item>
      </flexbox>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="submitInfo" type="primary">确定</XButton>
      <XButton @click.native="deleteCarousel" type="warn" v-if="id!==''">删除</XButton>
    </div>
  </div>
</template>

<script>
  import {CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton} from 'vux'
  import API from '@/utils/api'

  export default {
    name: "CarouselUpdate",
    data() {
      return {
        files: [],
        title: "",
        url: "",
        id: "",
        pic: "",
        weight: 0
      }
    },
    methods: {
      //选择文件
      getFile(e) {
        this.files = [];
        this.files.push(e.target.files[0])
      },
      //获取列表信息
      getCarouselById(id) {
        let self = this;
        API.getCarouselById(id).then(res => {
          if (res.data.code >= 200 && res.data.code < 300) {
            self.title = res.data.data.title;
            self.url = res.data.data.url;
            self.pic = res.data.data.pic;
            self.weight = res.data.data.weight;
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
      //新增轮播
      uploadCarousel(formData) {
        let self = this;
        self.$vux.loading.show({
          text: '上传中'
        });
        API.uploadCarousel(formData)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.$vux.toast.show({
                text: '上传成功',
                type: 'success'
              });
              self.$vux.loading.hide();
              window.history.back();
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
          })
      },
      //更新轮播
      updateCarousel(formData) {
        let self = this;
        self.$vux.loading.show({
          text: '更新中'
        });
        API.updateCarousel(formData)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.$vux.toast.show({
                text: '上传成功',
                type: 'success'
              });
              self.$vux.loading.hide();
              window.history.back();
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
          })
      },
      //提交数据
      submitInfo() {
        let self = this;
        let formData = new FormData();
        formData.append("url", self.url);
        formData.append("title", self.title);
        if (this.files.length > 0) {
          formData.append("uploadPic", self.files[0]);
        }
        if (self.id === "") {
          self.uploadCarousel(formData);
        } else {
          formData.append("id", self.id);
          formData.append("pic", self.pic);
          formData.append("weight", self.weight);
          self.updateCarousel(formData);
        }
      },
      //删除轮播
      deleteCarousel() {
        let self = this;
        self.$vux.loading.show({
          text: '删除中'
        });
        API.deleteCarousel(self.id)
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.$vux.toast.show({
                text: '删除成功',
                type: 'success'
              });
              self.$vux.loading.hide();
              window.history.back();
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
          })
      }
    },
    mounted() {
      let id = this.$route.params.id;
      if (id) {
        this.id = id;
        this.getCarouselById(id);
      }
    },
    components: {
      CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton
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
