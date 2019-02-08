<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="addAdminlist()"
      >添加管理员</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="管理员ID" align="center"></el-table-column>
        <el-table-column prop="roleName" label="管理员级别" align="center"></el-table-column>
        <el-table-column prop="username" label="账号" align="center"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center">
          <!-- <template slot-scope="scope">
          </template>-->
        </el-table-column>
        <el-table-column prop="lve" label="操作" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.id != 1">
              <el-button @click="addAdminlist(scope.row.id)" type="primary" size="small">修改</el-button>
              <el-button @click="del(scope.row.id)" type="danger" size="small">删除</el-button>
            </p>
            <p v-else>不可操作</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="15%" style="width:90%; ">
        <el-form-item label="账号" v-if="!user.id">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nameERR}}</span>
          <el-input placeholder="请输入账号" v-model="user.username"></el-input>
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
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllAdmin,
  getRoles,
  addAdmin,
  getAdminById,
  editAdmin,
  deleteAdminById
} from "@/api/login";

export default {
  data() {
    return {  
      loading: false,
      dialogFormVisible: false,
      tableData: [],
      title: "新增管理员",
      lisData: "",
      barList: [],
      user: {
        username: "",
        password: "",
        roleId: "",
        id: "",
        nickname: "",
      },
      nameERR: "",
      passwordERR: "",
      roleIdERR: "",
      nicknameERR: ""
    };
  },
  created() {
    this._getAdmins();
    this._getRoles();
  },
  methods: {
    _getAdmins() {
      getAllAdmin().then(res => {
        if (res.code === ERR_OK) {
          console.log("获取全部管理员============================");
          console.log(res.data);
          this.tableData = res.data.list;
        }
      });
    },
    _getRoles() {
      getRoles().then(res => {
        if (res.code === ERR_OK) {
          this.barList = res.data.list;
        }
      });
    },
    del(id) {
      this.$confirm("是否删除该管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAdminById(id).then(res => {
            if (res.code === ERR_OK) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this._getAdmins();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addAdminlist(id) {
      this.dialogFormVisible = true;
      this.nameERR = "";
      this.passwordERR = "";
      this.roleIdERR = "";
      if (id) {
        this.title = "修改管理员";
        this.user.id = id;
        getAdminById(id).then(res => {
          console.log(res.data);
          this.user = res.data;
        });
      } else {
        this.title = "新增管理员";
        this.user = {
          name: "",
          password: "",
          roleId: ""
        };
      }
    },
    quxiao() {
      this.dialogFormVisible = false;
    },
    trueover() {
      this.nameERR = "";
      this.passwordERR = "";
      this.roleIdERR = "";
      this.nicknameERR = "";
      if (!this.user.nickname) {
        this.nicknameERR = "请输入昵称";
        return;
      }
      if (!this.user.roleId) {
        this.roleIdERR = "请选择管理员权限";
        return;
      }
      console.log("123");
      if (this.title === "新增管理员") {
        if (!this.user.name) {
          this.nameERR = "请输入管理员账号";
          return;
        }
        if (!this.user.password) {
          this.passwordERR = "请输入管理员密码";
          return;
        }
        addAdmin(this.user).then(res => {
          if (res.code === ERR_OK) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            this._getAdmins();
          }
        });
      } else {
        console.log(this.user);
        editAdmin(this.user).then(res => {
          if (res.code === ERR_OK) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            this._getAdmins();
          }
        });
      }
    }
  }
};
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
