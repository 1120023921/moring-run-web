<template>
  <div>
    <HeaderImg></HeaderImg>
    <div style="text-align: center;color: lime;font-size: 30px;padding-top: 30px;padding-bottom: 30px;">
      体育测试成绩查询
    </div>
    <grid :cols=3>
      <grid-item v-for="grid in userList" @click.native="gradeShow(grid.type,grid.link,grid.label)" :key="grid.type"
                 :label="grid.label">
        <img slot="icon" :src="grid.src">
      </grid-item>
      <grid-item  @click.native="toUrl('http://wtjs.doublehh.cn/%E4%BF%9D%E5%81%A5%E5%85%8D%E6%B5%8B%E7%94%B3%E8%AF%B7%E8%A1%A8.doc')" label="保健免测申请表">
        <img slot="icon" :src="require('../assets/upload.png')">
      </grid-item>
      <grid-item  @click.native="toUrl('http://wtjs.doublehh.cn/%E9%80%80%E5%87%BA%E4%BD%93%E8%82%B2%E4%BF%9D%E5%81%A5%E6%9A%A8%E6%AD%A3%E5%B8%B8%E6%89%A7%E8%A1%8C%E3%80%8A%E6%A0%87%E5%87%86%E3%80%8B%E7%94%B3%E8%AF%B7%E8%A1%A8.doc')" label="退出保健申请表">
        <img slot="icon" :src="require('../assets/upload.png')">
      </grid-item>
      <grid-item v-if="isTeacher||isAdmin" v-for="grid in teacherList"
                 @click.native="gradeShow(grid.type,grid.link,grid.label)" :key="grid.type"
                 :label="grid.label">
        <img slot="icon" :src="grid.src">
      </grid-item>
      <grid-item v-if="isAdmin" v-for="grid in adminList" @click.native="gradeShow(grid.type,grid.link,grid.label)"
                 :key="grid.type"
                 :label="grid.label">
        <img slot="icon" :src="grid.src">
      </grid-item>
    </grid>
    <div class="copyright">
      <span>今日访问量：{{todayLogNum}} 网站访问总量：{{allLogNum}}</span><br/><br/>
      <span>Copyright © 2018-2019 DoubleH. All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
  import {Grid, GridItem} from 'vux'
  import HeaderImg from '@/components/HeaderImg'
  import API from '@/utils/api'

  const userList = [{
    url: '/',
    label: '体教考勤',
    type: '01',
    src: require('../assets/tjkq.png'),
    link: "AttendanceGradeShow"
  }, {
    label: '体质测试',
    type: '02',
    src: require('../assets/tzcs.png'),
    link: "GradeShow"
  }, {
    label: '技能考评',
    type: '03',
    src: require('../assets/jnkp.png'),
    link: "GradeShow"
  },{
      label: '视力上传',
      type: '09',
      src: require('../assets/upload.png'),
      link: "EyeUpdate"
  }];

  const teacherList = [{
    label: '成绩上传',
    type: '04',
    src: require('../assets/upload.png'),
    link: "UploadGrade"
  }, {
    label: '学生信息上传',
    type: '05',
    src: require('../assets/upload.png'),
    link: "UploadStudentInfo"
  }, {
    label: '成绩导出',
    type: '08',
    src: require('../assets/upload.png'),
    link: "ExportGrade"
  }, {
      label: '视力审核',
      type: '10',
      src: require('../assets/upload.png'),
      link: "ReviewEye"
  }];

  const adminList = [{
    label: '首页轮播管理',
    type: '06',
    src: require('../assets/upload.png'),
    link: "CarouselList"
  }, {
    label: '学期管理',
    type: '07',
    src: require('../assets/upload.png'),
    link: "SemesterList"
  }, {
    label: '手动更新成绩',
    type: '08',
    src: require('../assets/upload.png'),
    link: "UpdateGradeFromTmp"
  }];

  export default {
    name: 'Index',
    data() {
      return {
        userList: userList,
        teacherList: teacherList,
        adminList: adminList,
        isAdmin: false,
        isTeacher: false,
        isFirst: true,
        allLogNum: 0,
        todayLogNum: 0
      }
    },
    methods: {
      gradeShow(type, link, title) {
        this.$router.push({
          name: link,
          query: {
            type: type,
            title: title
          }
        })
      },
      getUserInfo(jobNumber) {
        let self = this;
        if (sessionStorage.getItem('roles') === null) {
          API.getTSUserWithRoles(jobNumber)
            .then(res => {
              if (res.data.code >= 200 && res.data.code < 300) {
                sessionStorage.setItem('name', res.data.data.name);
                let roles = res.data.data.roles;
                sessionStorage.setItem('roles', JSON.stringify(roles));
                for (let i = 0; i < roles.length; i++) {
                  if (roles[i].roid === 'admin') {
                    self.isAdmin = true;
                  } else if (roles[i].roid === 'teacher') {
                    self.isTeacher = true;
                  }
                }
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
            });
        } else {
          let roles = JSON.parse(sessionStorage.getItem('roles'));
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].roid === 'admin') {
              self.isAdmin = true;
            } else if (roles[i].roid === 'teacher') {
              self.isTeacher = true;
            }
          }
        }
      },
      getVisitNum() {
        let self = this;
        API.getTodayLogNum()
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.todayLogNum = res.data.data;
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
          });

        API.getAllLogNum()
          .then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
              self.allLogNum = res.data.data;
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
          });
      },
      toUrl(url){
        window.location.href=url
      }
    },
    mounted() {
      sessionStorage.setItem('jobNumber', this.$route.query.jobNumber);
      this.getUserInfo(sessionStorage.getItem('jobNumber'));
      if (sessionStorage.getItem('isFirst') === null) {
        sessionStorage.setItem('isFirst', '1');
        window.location.reload();
      }
      this.getVisitNum();
    },
    components: {
      Grid,
      GridItem, HeaderImg
    },
  }
</script>

<style scoped>
  .copyright {
    text-align: center;
    margin-top: 3%;
    color: #CCCCCC;
    font-size: 12px;
  }
</style>
