<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分数">
        <template slot-scope="scope">
          <span>{{ scope.row.totalScore }}分</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间">
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
        </template>
      </el-table-column>
    </el-table>
    <p style="text-align: center; margin: 20px 0;">
      <el-input style="width: 20%;" v-model="paperName" placeholder="请输入试卷题目"></el-input>
      <el-button @click="createExam">创建试卷</el-button>
    </p>
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
import { genericExampaper, submitExamPaper } from '@/until/api'
import { Message } from 'element-ui'
export default {
  name: 'exam',
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      timu: {},
      paperName: ''
    }
  },
  mounted () {
    this.exampaper()
  },
  methods: {
    exampaper () {
      genericExampaper().then(res => {
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
    createExam () {
      if (!this.paperName) {
        alert('请输入考试题目')
        return false
      }
      let id = []
      let totalScore = 0
      this.tableData.forEach(item => {
        id.push(item.id)
        totalScore += item.totalScore
      })
      submitExamPaper({
        teacherId: sessionStorage.getItem('teacherId'),
        paperName: this.paperName,
        totalScore: totalScore,
        questionList: id.join(',')
      }).then(res => {
        if (res.result === 'success') {
          this.exampaper()
          Message({
            message: '创建试卷成功',
            type: 'success'
          })
          this.paperName = ''
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
