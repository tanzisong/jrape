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
        label="标题" width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分数" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.totalScore }}分</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
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
            @click="begin(scope.row.id)"
          >开始考试</el-button>
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
import { listQuestionByExamId } from '@/until/api'
export default {
  name: 'testDetail',
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      timu: {}
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      listQuestionByExamId({
        examId: this.$route.query.id
      }).then(res => {
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
    begin (id) {
      let number = 0
      this.tableData.forEach((item, index) => {
        if (item.id === id) {
          number = index
        }
      })
      let data = {
        nextTM: 'all',
        question: this.tableData
      }
      this.$router.push({ name: 'write', query: { data: JSON.stringify(data), index: number } })
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
