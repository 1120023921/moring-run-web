<template>
  <div>
    <XHeader>视力上报</XHeader>
    <Group title="视力信息">
      <XInput title="左眼裸力视力" v-model="eye.leftNaked" :disabled="eye.status===1"></XInput>
      <XInput title="右眼裸眼视力" v-model="eye.rightNaked" :disabled="eye.status===1"></XInput>
      <XInput title="左眼串镜" v-model="eye.leftGlass" :disabled="eye.status===1"></XInput>
      <XInput title="右眼串镜" v-model="eye.rightGlass" :disabled="eye.status===1"></XInput>
      <XInput title="左眼屈光不正" v-model="eye.leftAmetropia" :disabled="eye.status===1"></XInput>
      <XInput title="右眼屈光不正" v-model="eye.rightAmetropia" :disabled="eye.status===1"></XInput>
      <XInput title="状态" v-model="eye.statusView" :disabled="true"></XInput>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="insertEye" type="primary" :disabled="eye.status===1">确定</XButton>
    </div>
  </div>
</template>

<script>
    import {CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton} from 'vux'
    import API from '@/utils/api'

    export default {
        name: "EyeUpdate",
        data() {
            return {
                eye: {
                    rightNaked: "",
                    leftGlass: "",
                    rightGlass: "",
                    leftAmetropia: "",
                    rightAmetropia: "",
                    status: 0
                }
            }
        },
        methods: {
            //获取列表信息
            getUserEye() {
                let self = this;
                API.getUserEye(sessionStorage.getItem('jobNumber')).then(res => {
                    if (res.data.code >= 200 && res.data.code < 300) {
                        if (res.data.data.status === 0) {
                            res.data.data.statusView = '未审核'
                        } else if (res.data.data.status === 1) {
                            res.data.data.statusView = '通过'
                        } else if (res.data.data.status === 2) {
                            res.data.data.statusView = '拒绝'
                        } else {
                            res.data.data.statusView = '未知'
                        }
                        self.eye = res.data.data;
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
            insertEye() {
                let self = this;
                API.insertEye(self.eye)
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
            }
        },
        mounted() {
            this.getUserEye()
        },
        components: {
            CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton
        }
    }
</script>

<style scoped>

</style>
