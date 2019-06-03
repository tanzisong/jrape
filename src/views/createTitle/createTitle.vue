<template>
  <div class="creat">
    提交测试数据(输入数据,输出数据)
    <div class="timu">
      <el-input style="width: 20%;" v-model="timu.title" placeholder="请输入标题"></el-input>
      <br>
      请输入问题描述: <div class="context" ref="context" contenteditable="true" ></div>
      <br><br>
      请输入分数: <el-input-number v-model="timu.totalScore" :min="1" :max="5" label="请输入题目分数"></el-input-number>
      <br><br>
      请输入数据范围: <el-input style="width: 20%;" v-model="timu.dataRange" placeholder="请输入数据范围"></el-input>
      <br><br>
      请输入最大内存: <el-input style="width: 20%;" v-model="timu.maxMemory" placeholder="请输入最大内存">
        <div slot="suffix">M</div>
      </el-input>
      <br><br>
      请输入输入样例:<el-input
      style="width: 20%;"
      type="textarea"
      placeholder="请输入输入样例"
      v-model="timu.inputExample">
    </el-input>
      <br><br>
      请输入输出样例:<el-input
      style="width: 20%;"
      type="textarea"
      placeholder="请输入输出样例"
      v-model="timu.outputExample">
      <br><br>
    </el-input>
      <br><br>
      <el-input style="width: 20%;" v-model="test.input" placeholder="请提交测试输入数据"></el-input>
      <el-input style="width: 20%;" v-model="test.output" placeholder="请提交测试输出数据"></el-input>
      <br><br>
      <el-button @click="createTiMu">创建题目</el-button>
    </div>
  </div>
</template>

<script>
import { insertQuestion, submitTestData } from '@/until/api'
import { Message } from 'element-ui'
export default {
  name: 'createTitle',
  data () {
    return {
      timu: {
        title: '',
        totalScore: '1',
        context: '',
        dataRange: '',
        maxMemory: '',
        inputExample: '',
        outputExample: '',
        teacherId: ''
      },
      test: {
        teacherId: '',
        questionId: '',
        input: '',
        output: ''
      }
    }
  },
  methods: {
    createTiMu () {
      this.timu.context = this.$refs.context.innerHTML
      this.timu.teacherId = this.test.teacherId = sessionStorage.getItem('teacherId')
      insertQuestion(this.timu).then(res => {
        if (res.result === 'success') {
          this.test.questionId = res.data
          submitTestData(this.test).then(res => {
            if (res.result === 'success') {
              Message({
                message: res.data,
                type: 'success'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .creat {
    margin-left: 60px;
  }
  .timu {
    width: 100%;
  }
  .context {
    width: 400px;
    height: 400px;
    margin: 20px 0;
    border: 1px solid #000;
    overflow-y: scroll;
  }
</style>
