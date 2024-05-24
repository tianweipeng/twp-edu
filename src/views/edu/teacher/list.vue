<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="teacherQuery.name" placeholder="姓名"/>
      </el-form-item>
      <el-form-item label="讲师级别">
        <el-select v-model="teacherQuery.level" placeholder="讲师级别">
          <el-option label="高级讲师" value="1"/>
          <el-option label="资深讲师" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <div class="block">
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="defaul" @click="resetList()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="list"
      element-loading-text = "数据加载中"
      style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="intro" label="简介" width="180"/>
      <el-table-column prop="career" label="生涯" width="180"/>
      <el-table-column prop="level" label="头衔" width="180">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级教师': '资深教师' }}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180"/>
      <el-table-column prop="gmtModified" label="修改时间" width="180"/>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary">修改</el-button>
          </router-link>
          <el-popconfirm
            :title="'确认删除讲师'+scope.row.name+'?'"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            @confirm="removeDataById(scope.row.id)"
          >
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" background layout="prev, pager, next" @current-change="getList"/> -->
    <div class="block">
      <span class="demonstration"/>
      <el-pagination
        :total="total"
        :page-sizes="limits"
        :current-page="page"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="changeList"
        @current-change="getList"/>
    </div>
  </div>
</template>

<script>

import teacher from '@/api/teacher/teacher'

export default {
  data() {
    return { // 定义变量和初始值
      list: [], // 返回对象
      page: 1, // 当前页
      limits: [10, 20, 30, 40],
      limit: 10, // 每页记录数
      total: 0, // 总记录数据
      date: [],
      teacherQuery: {} // 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 获取讲师列表的方法
    getList(page = 1) {
      console.log(this.date)
      this.page = page
      // eslint-disable-next-line eqeqeq
      if (this.date !== null) {
        this.teacherQuery.begin = this.date[0]
        this.teacherQuery.end = this.date[1]
      } else {
        this.teacherQuery.begin = this.date
        this.teacherQuery.end = this.date
      }
      teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          // 返回数据
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.date, this.page)
        }) // 请求成功
        .catch(error => {
          console.log(error)
        }) // 请求失败\
    },
    changeList(limit = 10) {
      this.limit = limit
      // 如分页数量小于当前页数，则取最大页数，例如当每页10条时，处于第三页，而每页30条的时候没有第三页，则取最大页数
      this.total / this.limit < this.page ? this.page = Math.ceil(this.total / this.limit) : this.page = this.page
      teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          // 返回数据
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
        }) // 请求成功
        .catch(error => {
          console.log(error)
        }) // 请求失败\
    },
    resetList(page = 1) {
      this.teacherQuery = {}
    },
    removeDataById(id) {
      teacher.deleteTeacherId(id)
        .then(response => {
          // 返回数据
          // console.log(response)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }) // 请求成功
        .catch(error => {
          console.log(error)
        }) // 请求失败\
    }
  }

}
</script>
