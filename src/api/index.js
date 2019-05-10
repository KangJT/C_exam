import request from '@/utils/request';

// 获取登录信息的接口
export function getLogin(body) {
  return request('/user/login', {
      method: "POST",
      body
  });
}

//获取当前用户信息
export function getUserInfo(){
  return request('/user/userInfo')
}

//添加试题接口
export function addQuestions(body) {
  return request('/exam/questions', {
      method: "post",
      body
  });
}

// 获取试题列表
export function getExamList(){
  return request('/exam/questions/new');
}

// 获取试题类型
export function getQuestionsType(){
  return request('/exam/getQuestionsType');
}

// 添加试题类型
export function addQuestionsType(body){
  return request('/exam/insertQuestionsType', {
    method: 'GET',
    body
  });
}


// 获取所有的课程
export function getAllClass(){
  return request('/exam/subject', {
    method: 'GET'
  });
}

// 获取所有的考试类型
export function getAllExamType(){
  return request('/exam/examType', {
    method: 'GET'
  });
}

// 获取所有的试题
export function getQuestionsList(){
  return request('/exam/questions/new');
}

//按条件获取试题
export function getCheckList(params){
  let arr=[]
  for(let k in params){
    if(params[k]){
      arr.push(k+"="+params[k])
    }
    return request(`/exam/questions/condition?${arr.join('&')}`)
  }
}

//用户展示
export function  getShowUser(body){
  if (body.index === 0) {
    return request('/user/user')
  } else if (body.index === 1) { //展示身份数据
      return request('/user/identity')
  } else if (body.index === 2) { //展示api接口权限数据
      return request('/user/api_authority')
  } else if (body.index === 3) { //展示api接口权限数据
    return request('/user/identity_api_authority_relation')
  } else if (body.index === 4) { //获取视图权限数据
      return request('/user/view_authority')
  } else if (body.index === 5) { //展示身份和视图权限关系
      return request('/user/identity_view_authority_relation')
  }
}


//教室管理  获取数据 获取全部教室
export function getClassRoomManage() {
  return request('/manger/room')
}
//班级管理 获取班级  
export function getGradeManage() {
  return request('/manger/grade')
}
//添加教室
export function getClassRoomManageAdd(body) {
  return request('/manger/room',{
    method:"POST",
    body
  })
}
//删除教室
export function getClassRoomManageDelete(body) {
  return request('/manger/room/delete',{
    method:"DELETE",
    body
  })
}
//学生管理    列表
export function getStudentsManage() {
  return request('/manger/student',{
    method:"get"
  })
}
//学生管理  删除学生
export function getStudentdsDelete(params) {
  return request('/manger/student/'+params.id,{
    method:"DELETE"
  })
}
// //学生管理  查询
// export function gerStudentSearch(body) {
//   console.log('student_id',body)
//   return request('/manger/student/edit',{
//     method:"PUT"
//   })
// }


// 添加考试
export function addExam(addData) {
  return request('/exam/exam', {
    method: 'POST',
    body: addData
  });
}

// 获取试卷
export function getExamLists(addData) {
  return request('/exam/exam', {
    method: 'GET'
  });
}

// 更新试卷
export function getNewExam(addData) {
  return request('/exam/exam/'+addData.question_ids, {
    method: 'PUT',
    body: {question_ids: addData.questions_id}
  });
}

//获取待批卷班级的列表(获取所有班级列表)
export  function getReadExamList() {
  return request('/manger/grade', {
    method: 'GET'
  });
}

// 获取学生试卷 
export  function getStudentExamList(body) {
  return request('/exam/student', {
    method: 'GET',
    body
  });
}

//删除指定的试题类型
export function getDelte(body) {
  return request('/exam/delQuestionsType', {
      method: "post",
      body
  });
}


//更新试题
export function getUpdate(body) {
  return request('/exam/questions/update', {
      method: "PUT",
      body
  });
}
// 班级管理（获取已经分配教室的班级的接口）
export function getClassManagement() {
  return request('/manger/grade');
}

export function getOverExam(body) {
  return request('/exam/student/'+body.id, {
    method: "PUT",
    body: body.score
  })
}
// 添加班级
export function getAddClass(body){
  return request('/manger/grade',{
    method:'POST',
    body
  });
}

// 删除班级
export function getRemoveClass(body){
  return request('/manger/grade/delete',{
    method:'DELETE',
    body
  });
}

// 图标统计数据(总揽数量统计)
export function getLconData(){
  return request('/home/search/report');
}
