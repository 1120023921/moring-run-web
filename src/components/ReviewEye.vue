<template>
  <div>
    <XHeader>视力审核</XHeader>
    <div>
      <el-row>
        <el-col :span="4" :offset="2">
          <el-input v-model="params.userId" placeholder="请输入学号" clearable></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-select v-model="params.status" placeholder="请选择状态" clearable>
            <el-option
              :key="0"
              label="未审核"
              :value="0">
            </el-option>
            <el-option
              :key="1"
              label="通过"
              :value="1">
            </el-option>
            <el-option
              :key="2"
              label="拒绝"
              :value="2">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1" :offset="11">
          <el-button type="primary" @click="queryEye">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="学号"
        prop="userId">
      </el-table-column>
      <el-table-column
        label="左眼裸力视力"
        prop="leftNaked">
      </el-table-column>
      <el-table-column
        label="右眼裸眼视力"
        prop="rightNaked">
      </el-table-column>
      <el-table-column
        label="左眼串镜"
        prop="leftGlass">
      </el-table-column>
      <el-table-column
        label="右眼串镜"
        prop="rightGlass">
      </el-table-column>
      <el-table-column
        label="左眼屈光不正"
        prop="leftAmetropia">
      </el-table-column>
      <el-table-column
        label="右眼屈光不正"
        prop="rightAmetropia">
      </el-table-column>
      <el-table-column
        label="审核结果"
        prop="statusView">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status!==0"
            size="mini"
            @click="reviewEye(scope.row,1)">通过
          </el-button>
          <el-button
            :disabled="scope.row.status!==0"
            size="mini"
            type="danger"
            @click="reviewEye(scope.row,2)">拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
    import {XHeader} from 'vux'
    import API from '@/utils/api'

    export default {
        name: "ReviewEye",
        data() {
            return {
                tableData:[],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                params: {}
            }
        },
        methods: {
            queryEye() {
                let self = this;
                API.queryEye(self.pageInfo.pageNum, self.pageInfo.pageSize, self.params).then(res => {
                    if (res.data.code >= 200 && res.data.code < 300) {
                        self.pageInfo.total = res.data.data.total
                        res.data.data.records.map(item => {
                            if (item.status === 0) {
                                item.statusView = '未审核'
                            } else if (item.status === 1) {
                                item.statusView = '通过'
                            } else if (item.status === 2) {
                                item.statusView = '拒绝'
                            } else {
                                item.statusView = '未知'
                            }
                        })
                        self.tableData = res.data.data.records
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
            reviewEye(params, result) {
                let self = this;
                params.status = result
                API.reviewEye(params).then(res => {
                    if (res.data.code >= 200 && res.data.code < 300) {
                        self.$vux.toast.show({
                            text: '操作成功',
                            type: 'success'
                        })
                        self.queryEye()
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
            handleSizeChange(val) {
                this.pageInfo.pageSize = val
                this.queryEye()
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val
                this.queryEye()
            }
        },
        mounted() {
            this.queryEye()
        },
        components: {
            XHeader
        }
    }
</script>

<style scoped>

</style>
