import http from '@/until/http'
// 登陆
export function studentLogin (data) {
  return http.post('/student/login', data)
}
export function teacherLogin (data) {
  return http.post('/teacher/login', data)
}
// 自动生成试卷
export function genericExampaper (data) {
  return http.post('/exam/genericExamPaper', data)
}
// 提交试卷
export function submitExamPaper (data) {
  return http.post('/exam/submitExamPaper', data)
}
// 提交题目
export function insertQuestion (data) {
  return http.post('/question/insertQuestion', data)
}
// 提交测试数据接口
export function submitTestData (data) {
  return http.post('/testData/submitTestData', data)
}
// 审核题目列表
export function listQuestionForExamine (data) {
  return http.post('/question/listQuestionForExamine', data)
}
// 审核题目
export function submitExamine (data) {
  return http.post('/examine/submitExamine', data)
}

// 学生接口
// 所有题目列表页面
export function listQuestions (data) {
  return http.post('/question/listQuestions', data)
}
// 保存并调试
export function commit (data) {
  return http.post('/commit/commit', data)
}
// 考试列表
export function listExamPaper (data) {
  return http.post('/exam/listExamPaper', data)
}
// 根据考试id获取试卷
export function listQuestionByExamId (data) {
  return http.post('/exam/listQuestionByExamId', data)
}
// 查看自己提交记录
export function listCommitRecord (data) {
  return http.post('/commit/listCommitRecord', data)
}
