import dynamicComponent from '@/utils/dynamicComponent'


//试题管理
const questions={
  path: '/question',
  name: 'Questions',
  title: '试题管理',
  icon: '',
  children: [
    {
      path: '/question/add',
      name: 'AddQuestions',
      title: '试题添加',
      flag:true,
      component: dynamicComponent(['addQuestions.js','checkQuestions.js'], () =>
        import('@questions/AddQuestions/index.js')
      )
    },
    {
      path: '/question/check',
      name: 'CheckQuestions',
      title: '试题查看',
      flag:true,
      component: dynamicComponent(['checkQuestions.js'], () =>
        import('@questions/CheckQuestions/index.js')
      )
    },
    {
      path: '/question/detail',
      name: 'QuestionsDetail',
      title: '试题详情',
      flag:false,
      component: dynamicComponent(['questions.js'], () =>
        import('@questions/QuestionsDetail/index.js')
      )
    },
    {
      path: '/question/edit',
      name: 'EditQuestions',
      title: '试题编辑',
      flag:false,
      component: dynamicComponent(['addQuestions.js','checkQuestions.js'], () =>
        import('@questions/AddQuestions/index.js')
      )
    },
    {
      path: '/question/type',
      name: 'QuestionsType',
      title: '试题分类',
      flag:true,
      component: dynamicComponent(['questionsType.js'], () =>
        import('@questions/QuestionsType/index.js')
      )
    }
  ]
}


//用户管理
const user = {
  path: '/user',
  name: 'User',
  title: '用户管理',
  icon: '',
  children: [
    {
      path: '/user/add',
      name: 'AddUser',
      title: '添加用户',
      flag:true,
      component: dynamicComponent(['questions.js'], () =>
        import('@user/AddUser/index.js')
      )
    },
    {
      path: '/user/role',
      name: 'AddRole',
      title: '角色管理',
      flag:true,
      component: dynamicComponent(['questions.js'], () =>
        import('@user/AddRole/index.js')
      )
    },
    {
      path: '/user/show',
      name: 'ShowUser',
      title: '用户展示',
      flag:true,
      component: dynamicComponent(['questions.js'], () =>
        import('@user/ShowUser/index.js')
      )
    }
  ]
}

//考试管理
const exam = {
  path: '/exam',
  name: 'Exam',
  title: '考试管理',
  icon: '',
  children: [
    {
      path: '/exam/add',
      name: 'AddExam',
      title: '添加考试',
      flag:true,
      component: dynamicComponent(['exam.js'], () =>
        import('@exam/AddExam/index.js')
      )
    },
    {
      path: '/exam/addExam',
      name: 'addExam',
      title: '添加试题',
      flag:false,
      component: dynamicComponent(['exam.js'], () =>
        import('@exam/AddExamDetail/index.js')
      )
    },
    {
      path: '/exam/list',
      name: 'ExamList',
      title: '试卷列表',
      flag:true,
      component: dynamicComponent(['exam.js'], () =>
        import('@exam/ExamList/index.js')
      )
    },
    {
      path: '/exam/detail',
      name: 'examDetail',
      title: '试卷详情',
      flag:false,
      component: dynamicComponent(['exam.js'], () =>
        import('@exam/ExamDefailt/index.js')
      )
    }
  ]
}

//班级管理
const grade = {
  path: '/grade',
  name: 'Grade',
  title: '班级管理',
  icon: '',
  children: [
    {
      path: '/grade/grade',
      name: 'GradeManage',
      title: '班级管理',
      flag:true,
      component: dynamicComponent(['ClassManagement.js'], () =>
        import('@grade/GradeManage/index.js')
      )
    },
    {
      path: '/grade/classroom',
      name: 'ClassRoomManage',
      title: '教室管理',
      flag:true,
      component: dynamicComponent(['classRoomManage.js'], () =>
        import('@grade/ClassRoomManage/index.js')
      )
    },{
      path: '/grade/student',
      name: 'StudentManage',
      title: '学生管理',
      flag:true,
      component: dynamicComponent(['studentManage.js'], () =>
        import('@grade/StudentManage/index.js')
      )
    }
  ]
}


//阅卷管理
const marking = {
  path: '/marking',
  name: 'Marking',
  title: '阅卷管理',
  icon: '',
  children: [
    {
      path: '/marking/waitclass',
      name: 'WaitClass',
      title: '待批班级',
      flag:true,
      component: dynamicComponent(['getReadExamList.js'], () =>
        import('@marking/WaitClass/index.js')
      )
    },
    {
      path: '/marking/waitDetail',
      name: 'waitDetail',
      title: ' ',
      flag:false,
      component: dynamicComponent(['getReadExamList.js'], () =>
        import('@marking/waitDefault/index.js')
      )
    },
    {
      path: '/marking/waitDetailIn',
      name: 'waitDetailIn',
      title: '阅卷',
      flag:false,
      component: dynamicComponent(['getReadExamList.js'], () =>
        import('@marking/waitDefaultIn/index.js')
      )
    }
  ]
}

//数据统计
const statistics = {
  path: '/statistics',
  name: 'Statistics',
  title: '数据统计',
  icon: '',
  children: [
    {
      path: '/statistics/graphical',
      name: 'Statistics',
      title: '图形统计',
      flag:true,
      component: dynamicComponent(['questions.js'], () =>
        import('@/routes/statistics/index.js')
      )
    }
  ]
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    title: '登录',
    component: dynamicComponent(['login.js'], () =>
      import('@/routes/Login/index.js')
    )
  },
  {
    path: '/',
    layoutName: 'SystemLayout',
    children: [questions,user,exam,grade,marking,statistics]
  }
]

/**
 * @description:
 * @param : 根据模板名称获取模板下对应的所有路由
 * @return:
 */
const getLayoutRoute = layoutName => {
  const layoutRouteObj = {}

  routes.forEach((item, index) => {
    if (item.layoutName) {
      const childRoutes = item.children.map(child => {
        return child.children
      })
      layoutRouteObj[item.layoutName] = [].concat(...childRoutes)
    }
  })
  return layoutRouteObj[layoutName]
}

/**
 * @description:
 * @param : 根据模板名称获取模板下对应的重定向
 * @return:
 */
const getLayoutRedirect = layoutName => {
  const redirectArr = []

  routes.forEach((item, index) => {
    if (item.layoutName) {
      item.children.forEach(child => {
        redirectArr.push({
          to:child.children[0].path,
          from:child.path
        })
      })
    }
  })
  return redirectArr
}


/**
 * @description:
 * @param : 根据模板名称渲染模板下对应的菜单栏
 * @return:
 */
const getLayoutMenu = layoutName => {
  const layoutRouteObj = {}

  routes.forEach((item, index) => {
    if (item.layoutName) {
      layoutRouteObj[item.layoutName] = item.children
    }
  })
  return layoutRouteObj[layoutName]
}


/**
 * @description:
 * @param : 根据路由路径获取title
 * @return:
 */
const getRouterTitle = (() => {
  const routersInfo={}
  const getRouterTitleObj=(routesArr=routes)=>{
    routesArr.forEach((item, index) => {
      routersInfo[item.path]={
        name:item.title,
        title:item.title
      }
      if(item.children){
        getRouterTitleObj(item.children)
      }
    })
  }
  getRouterTitleObj()
  return (pathname)=>{
    return routersInfo[pathname]
  }
})()


export {
  routes,
  getLayoutRoute,
  getLayoutRedirect,
  getLayoutMenu,
  getRouterTitle
}
