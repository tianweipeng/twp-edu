<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="80px" >
    <el-form-item label="讲师头像">
      <!-- 头衔缩略图 -->
      <pan-thumb :image="teacher.avatar"/>
      <!-- 文件上传按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
      </el-button>

      <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
      <input type="file" name="file"/>
      -->
      <image-cropper
                    v-show="imagecropperShow"
                    :width="300"
                    :height="300"
                    :key="imagecropperKey"
                    :url="BASE_API+'/eduoss/fileoss'"
                    field="file"
                    @close="close"
                    @crop-upload-success="cropSuccess"/>
      </el-form-item>
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
        <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>


<script>

import teacherApi from '@/api/teacher/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'


export default {
  components: { ImageCropper, PanThumb },
  data() {
    return { // 定义变量和初始值
      teacher: {
        name: '',
        level: '',
        intro: '',
        career: '',
        avatar: ''
      }, // 条件封装对象
      saveBtnDisabled: false, // 保存按钮是否禁用
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API,
    }
  },
  watch: { // 监听路由发生变化，解决点击修改讲师后，再点击添加讲师，回显数据依然存在的问题
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
    },
    close() {
      this.imagecropperShow=false
      this.imagecropperKey = this.imagecropperKey+1 //初始化头像上传组件，否则需要更换图片时，还是上一次上传成功或失败的额状态
    },
    cropSuccess(data) {
      this.teacher.avatar = data.url
      this.close();
    }
  }
}
</script>
