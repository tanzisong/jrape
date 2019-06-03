<template>
  <div class="write">
    <div class="write-header">
      <span><i class="el-icon-tickets" />题目名称: {{ question.title }}</span>
      <!--dataRange 数据范围-->
      <!--maxMemory:最大内存-->
      <!--maxTime: 最长时间-->
    </div>
    <div class="left">
      <div class="left-content" v-html="question.context" />
      <div class="example">
        <br>
        <span>输入样例</span>
        <p v-html="question.inputExample" />
        <span>输出样例</span>
        <p v-html="question.outputExample" />
        <span>数据范围:</span>
        <p v-html="question.dataRange" />
        <div class="line1" />
        <p>题目创建时间:{{ question.createDate }}</p>
        <p>题目分数:{{ question.totalScore }}分</p>
      </div>
    </div>
    <div class="right">
      <el-button type="primary" @click="save">保存并提交</el-button>
      <el-button v-show="nextTM === 'all'" type="primary" @click="xyt">下一题</el-button>
      <div class="right-write" ref="rightWrite" >
        <el-input
          type="textarea"
          placeholder="请输入内容"
          class="textarea"
          v-model="textarea"></el-input>
      </div>
      <div v-show="rightShow" class="right-box">
        <div>输出信息:{{ showText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { commit } from '@/until/api'
export default {
  name: 'Index',
  data () {
    return {
      nextTM: 'one',
      showText: '',
      rightShow: false,
      question: {},
      nowNumber: 0,
      allQuestion: [],
      textarea: ''
    }
  },
  mounted () {
    this.nextTM = JSON.parse(this.$route.query.data).nextTM
    if (this.nextTM === 'all') {
      this.allQuestion = JSON.parse(this.$route.query.data).question
      this.nowNumber = this.$route.query.index
      this.question = this.allQuestion[this.nowNumber]
    } else {
      this.question = JSON.parse(this.$route.query.data).question
    }
  },
  methods: {
    xyt () {
      if (this.nowNumber === this.allQuestion.length - 1) {
        alert('试卷结束')
        return false
      }
      this.nowNumber = this.nowNumber + 1
      this.question = this.allQuestion[this.nowNumber]
    },
    save () {
      commit({
        studentId: sessionStorage.getItem('studentId'),
        questionId: this.question.id,
        answerContext: this.textarea
      }).then(res => {
        if (res.result === 'success') {
          this.showText = res.data.resultMessage
          this.rightShow = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .write-header {
    width: 100%;
    height: 30px;
    background: #171e22;
    color: #fff;
  }
  .left {
    padding-left: 10px;
    padding-right: 10px;
    width: 50%;
    height: 630px;
    background: #ebebeb;
    float: left;
    color: #333;
  }
  .right {
    position: relative;
    width: 50%;
    height: 630px;
    background: #272822;
    float: right;
  }
  .right-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;
    background: #3d444c;
    color: rgb(0, 188, 155);
  }
  .left-content {
    width: 100%;
    height: 200px;
  }
  .line1 {
    width: 100%;
    height: 1px;
    background: #000;
  }
  .right-write {
    width: 100%;
    height: 100%;
    color: #fff;
  }
</style>

<style lang="scss">
  .textarea {
    height: 100%;
    .el-textarea__inner {
      height: 100%;
      background: #000;
      color: #fff;
    }
  }
</style>
