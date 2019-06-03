<template>
  <div>
    <el-table
      :data="examList"
      style="width: 100%"
    >
      <el-table-column
        label="教师Id" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="试卷题目" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.paperName }}</span>
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
          >查看试卷</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listExamPaper } from '@/until/api'
export default {
  name: 'selectTest',
  data () {
    return {
      examList: []
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      listExamPaper().then(res => {
        if (res.result === 'success') {
          this.examList = res.data
        }
      })
    },
    detail (id) {
      this.$router.push({ name: 'testDetail', query: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
