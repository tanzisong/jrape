<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="题号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="题目"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="begin(scope.row.id)"
          >开始做题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listQuestions } from '@/until/api'
export default {
  name: 'topicsList',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.listAllq()
  },
  methods: {
    listAllq () {
      listQuestions().then(res => {
        if (res.result === 'success') {
          this.tableData = res.data
        }
      })
    },
    begin (id) {
      let question = this.tableData.filter(item => {
        return item.id === id
      })
      let data = {
        nextTM: 'one',
        question: question[0]
      }
      this.$router.push({ name: 'write', query: { data: JSON.stringify(data) } })
    }
  }
}
</script>

<style scoped>

</style>
