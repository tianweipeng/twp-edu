import request from '@/utils/request'

export default {
  // 获取教师列表（条件分页查询）
  // current当前页，limit每页记录数，teacherQuery条件
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // data表示用json传递对象到接口中
      data: teacherQuery
    })
  },
  // 删除讲师
  deleteTeacherId(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // id查询讲师
  getTeacherById(id) {
    return request({
      url: `/eduservice/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  // id修改讲师
  updateTeacherById(teacher) {
    return request({
      url: `/eduservice/edu-teacher/updateTeacher`,
      method: 'put',
      data: teacher
    })
  }
}
