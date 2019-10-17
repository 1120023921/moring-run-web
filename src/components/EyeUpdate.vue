<template>
  <div>
    <XHeader>视力上报</XHeader>
    <Group title="视力信息">
      <XInput title="左眼裸力视力" v-model="eye.leftNaked" :disabled="eye.status===1"></XInput>
      <XInput title="右眼裸眼视力" v-model="eye.rightNaked" :disabled="eye.status===1"></XInput>
      <Group title="">
        <Selector title="左眼串镜" v-model="eye.leftGlass" :options="glassList"></Selector>
      </Group>
      <Group title="">
        <Selector title="右眼串镜" v-model="eye.rightGlass" :options="glassList"></Selector>
      </Group>
      <Group title="">
        <Selector title="左眼屈光不正" v-model="eye.leftAmetropia" :options="ametropiaList"></Selector>
      </Group>
      <Group title="">
        <Selector title="右眼屈光不正" v-model="eye.rightAmetropia" :options="ametropiaList"></Selector>
      </Group>
      <XInput title="状态" v-model="eye.statusView" :disabled="true"></XInput>
    </Group>
    <div style="padding:15px;">
      <XButton @click.native="insertEye" type="primary" :disabled="eye.status===1">确定</XButton>
    </div>
  </div>
</template>

<script>
    import {CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton, Selector} from 'vux'
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
                },
                glassList: [
                    {key: '0 正常', value: '0 正常'},
                    {key: '1 远视', value: '1 远视'},
                    {key: '-1 近视', value: '-1 近视'},
                    {key: '2 疾病', value: '2 疾病'}
                ],
                ametropiaList: [
                    {key: '0 正常', value: '0 正常'},
                    {key: '1 近视', value: '1 近视'},
                    {key: '2 远视', value: '2 远视'},
                    {key: '3 疾病', value: '3 疾病'}
                ]
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
            //更新学期
            insertEye() {
                let self = this;
                if (self.eye.leftNaked != 0 && !(self.eye.leftNaked >= 3.0 && self.eye.leftNaked <= 5.3)) {
                    alert('左眼视力录入范围3.0-5.3之间，若低于3.0，则填0')
                    return
                }
                if (self.eye.rightNaked != 0 && !(self.eye.rightNaked >= 3.0 && self.eye.rightNaked <= 5.3)) {
                    alert('右眼视力录入范围3.0-5.3之间，若低于3.0，则填0')
                    return
                }
                if(self.eye.leftNaked>=5.0&&self.eye.leftNaked<=5.3){
                    self.eye.leftGlass = '0 正常'
                    self.eye.leftAmetropia = '0 正常'
                }
                if(self.eye.rightNaked>=5.0&&self.eye.rightNaked<=5.3){
                    self.eye.rightGlass = '0 正常'
                    self.eye.rightAmetropia = '0 正常'
                }
                if(self.eye.leftGlass===null){
                    alert('左眼串镜未填')
                    return
                }
                if(self.eye.rightGlass===null){
                    alert('右眼串镜未填')
                    return
                }
                if(self.eye.leftAmetropia===null){
                    alert('左眼屈光不正未填')
                    return
                }
                if(self.eye.rightAmetropia===null){
                    alert('右眼屈光不正未填')
                    return
                }
                self.eye.userId = sessionStorage.getItem('jobNumber')
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
            CellBox, Cell, Group, XHeader, XInput, FlexboxItem, Flexbox, XButton, Selector
        }
    }
</script>

<style scoped>

</style>
