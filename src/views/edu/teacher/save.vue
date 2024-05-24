<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="80px" >
      <el-form-item label="讲师姓名">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" placeholder="请选择讲师头衔">
          <el-option label="高级讲师" value="1"/>
          <el-option label="资深讲师" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"/>
      </el-form-item>
      <el-form-item label="讲师生涯">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="saveOrUpdate">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import teacherApi from '@/api/teacher/teacher'

export default {
  data() {
    return { // 定义变量和初始值
      teacher: {
        name: '',
        level: '',
        intro: '',
        career: '',
        avatar: ''
      }, // 条件封装对象
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },
  watch: { // 监听路由发生变化
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getById(id)
      } else {
        this.teacher = {}
      }
    },
    saveOrUpdate() {
      // 判断是否修改或添加
      if (this.teacher.id) {
        // 添加
        this.updateTeacher()
      } else {
        this.saveTeacher()
      }
    },
    updateTeacher() {
      teacherApi.updateTeacherById(this.teacher)
        .then(response => { // 添加成功
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .then(response => {
          this.$router.push({ path: '/teacher/table' })
        })
    },
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => { // 添加成功
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        })
        .then(response => {
          this.$router.push({ path: '/teacher/table' })
        })
    },
    // 根据id查讲师
    getById(id) {
      teacherApi.getTeacherById(id)
        .then(response => {
          this.teacher = response.data.items
          console.log(this.teacher)
        })
    }
  }
}
</script>
