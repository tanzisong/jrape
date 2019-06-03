<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="教师Id" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待审核题目" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总分" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.totalScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="detail(scope.row.id)"
          >查看题目详情</el-button>
          <el-button
            size="mini"
            @click="dispose(scope.row.id, 1)"
          >审核通过</el-button>
          <el-button
            size="mini"
            @click="dispose(scope.row.id, 2)"
          >不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="题目详情"
      :visible.sync="dialogVisible"
      width="60%"
      style="text-align: center;">
      <p>{{ timu.title }}</p>
      <div class="line-1px"/>
      <p v-html="timu.context" style="margin: 20px 0 20px 0;"></p>
      <div class="line-1px"/>
      <p style="margin: 20px 0 20px 0; text-align: left">数据范围: {{ timu.dataRange }}</p>
      <div class="line-1px"/>
      <p style="margin: 20px 0 20px 0; text-align: left">占用最大内存: {{ timu.maxMemory }}</p>
      <div class="line-1px"/>
      <p style="margin: 20px 0 20px 0; text-align: left">输入样例: <span v-html="timu.inputExample"></span></p>
      <p style="margin: 20px 0 20px 0; text-align: left">输出样例: <span v-html="timu.outputExample"></span></p>
    </el-dialog>
  </div>
</template>

<script>
import { listQuestionForExamine, submitExamine } from '@/until/api'
import { Message } from 'element-ui'
export default {
  name: 'auditTopics',
  data () {
    return {
      tableData: [],
      timu: {},
      dialogVisible: false
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      listQuestionForExamine().then(res => {
        if (res.result === 'success') {
          this.tableData = res.data
        }
      })
    },
    detail (id) {
      let a = this.tableData.filter(item => {
        return item.id === id
      })
      this.timu = a[0]
      this.dialogVisible = true
    },
    dispose (id, status) {
      submitExamine({
        teacherId: sessionStorage.getItem('teacherId'),
        questionId: id,
        status: status,
        context: ''
      }).then(res => {
        if (res.result === 'success') {
          Message({
            message: res.data,
            type: 'success'
          })
          this.list()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .line-1px {
    width: 100%;
    height: 1px;
    background: #000;
  }
</style>
