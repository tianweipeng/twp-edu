import Layout from '@/views/layout/Layout'

export default [{
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '讲师添加',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '讲师添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '讲师修改',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '讲师修改', noCache: true },
        // 隐藏路由
        hidden: true
      }
    ]
  }
]