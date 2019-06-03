<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="id" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="title" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提交时间" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.commitTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="执行结果" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.resultMessage }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分数" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="begin(scope.row.commitContext)"
          >查看代码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="代码"
      :visible.sync="dialogVisible"
      width="30%"
      style="text-align: center;">
      <p v-html="commitContext"></p>
    </el-dialog>
  </div>
</template>

<script>
import { listCommitRecord } from '@/until/api'
export default {
  name: 'records',
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      commitContext: ''
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      listCommitRecord({
        studentId: sessionStorage.getItem('studentId')
      }).then(res => {
        if (res.result === 'success') {
          this.tableData = res.data
        }
      })
    },
    begin (commitContext) {
      this.dialogVisible = true
      this.commitContext = commitContext
    }
  }
}
</script>

<style scoped>

</style>
