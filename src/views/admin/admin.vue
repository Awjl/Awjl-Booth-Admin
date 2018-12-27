<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
      >添加管理员</el-button>
      <div class="he20"></div>
      <el-table :data="dataAll.dataList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="管理员ID" align="center"></el-table-column>
        <el-table-column prop="roleName" label="管理员级别" align="center"></el-table-column>
        <el-table-column prop="username" label="账号" align="center"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center">
          <template slot-scope="scope"></template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.id != 1">
              <el-button type="primary" size="small">修改</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </p>
            <p v-else>不可操作</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="dataAll.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="dataAll.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataAll.total"
      ></el-pagination>
    </div>
    <!-- <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="15%" style="width:90%; ">
        <el-form-item label="账号" v-if="!user.id">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nameERR}}</span>
          <el-input placeholder="请输入账号" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nicknameERR}}</span>
          <el-input placeholder="请输入昵称" v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" v-if="!user.id">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{passwordERR}}</span>
          <el-input placeholder="请输入密码" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="管理权限">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{roleIdERR}}</span>
          <el-select
            clearable
            style="width: 150px"
            class="filter-item"
            v-model="user.roleId"
            placeholder="选择管理权限"
          >
            <el-option
              v-for="(item, index) in barList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueover">保存</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      dataAll: {
        page: 1,
        limit: 10,
        total: 100,
        isUpper: '',
        dataList: []
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    del(id) {
      this.$confirm('是否删除该管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    }
  }
}
</script>
<style>
.he20 {
  height: 20px;
}
.filter-container {
  width: 100%;
  min-height: 700px;
}
</style>
