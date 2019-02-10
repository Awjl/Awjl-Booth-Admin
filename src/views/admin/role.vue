<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="addRoles()"
      >新增权限</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <p>{{`${new Date(scope.row.createDate).getFullYear()}/${ 10 > (new Date(scope.row.createDate).getMonth() + 1) ? '0' + (new Date(scope.row.createDate).getMonth()+ 1) : new Date(scope.row.createDate).getMonth()}/${ 10 > new Date(scope.row.createDate).getDate() ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate()}`}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.id != 1">{{scope.row.note}}</p>
            <p v-else>最高权限，不可更改</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.id != 1">
              <el-button @click="addRoles(scope.row.id)" type="primary" size="small">修改</el-button>
              <el-button @click="del(scope.row.id)" type="danger" size="small">删除</el-button>
            </p>
            <p v-else>不可操作</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="15%" style="width:90%;">
        <el-form-item label="权限名称">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nameERR}}</span>
          <el-input placeholder="请输入权限名称" v-model="dataAll.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="请输入备注" v-model="dataAll.note"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div>广告管理</div>
          <el-checkbox-group v-model="dataAll.bannerData">
            <el-checkbox
              v-for="(item, index) in bannerList"
              :label="item.key"
              :key="index"
              style="margin-left:0; margin-right:15px;"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>企业管理</div>
          <el-checkbox-group v-model="dataAll.enterpriseData">
            <el-checkbox
              v-for="(item, index) in enterpriseData"
              :label="item.key"
              :key="index"
              style="margin-left:0; margin-right:15px;"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>会展管理</div>
          <el-checkbox-group v-model="dataAll.exhibitionData">
            <el-checkbox
              v-for="(item, index) in exhibitionData"
              :label="item.key"
              :key="index"
              style="margin-left:0; margin-right:15px;"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>服务管理</div>
          <el-checkbox-group v-model="dataAll.serviceData">
            <el-checkbox
              v-for="(item, index) in serviceData"
              :label="item.key"
              :key="index"
              style="margin-left:0; margin-right:15px;"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>管理员管理</div>
          <el-checkbox-group v-model="dataAll.adminData">
            <el-checkbox
              v-for="(item, index) in adminData"
              :label="item.key"
              :key="index"
              style="margin-left:0; margin-right:15px;"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>系统管理</div>
          <el-checkbox-group v-model="dataAll.systemData">
            <el-checkbox
              v-for="(item, index) in systemList"
              :label="item.key"
              :key="index"
              style="margin-left:0; margin-right:15px;"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
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
import { getRoles, addRole, getRoleById, editRole ,deleteRole} from "@/api/login";

export default {
  data() {
    return {
      title: "新增权限管理",
      dialogFormVisible: false,
      checkAll: false,
      loading: false,
      tableData: [],
      nameERR: "",
      bannerList: [
        { key: 1, name: "新增广告" },
        { key: 2, name: "修改广告" },
        { key: 3, name: "上下架广告" },
        { key: 4, name: "删除广告" }
      ],
      enterpriseData: [
        { key: 1, name: "企业推送" },
        { key: 2, name: "企业认证" },
        { key: 3, name: "企业推荐" }
      ],
      exhibitionData: [
        { key: 1, name: "会展推送" },
        { key: 2, name: "参展/到访商修改" },
        { key: 3, name: "修改展会" },
        { key: 4, name: "添加展会" },
        { key: 5, name: "上/下架展会" },
        { key: 6, name: "删除展会" }
      ],
      serviceData: [{ key: 1, name: "设计联系" }],
      adminData: [
        { key: 1, name: "添加管理员" },
        { key: 2, name: "修改管理员" },
        { key: 3, name: "删除管理员" },
        { key: 4, name: "新增权限" },
        { key: 5, name: "修改权限" },
        { key: 6, name: "删除权限" }
      ],
      systemList: [{ key: 1, name: "删除日志" }],
      dataAll: {
        id: "",
        name: "",
        note: "",
        bannerData: "",
        enterpriseData: "",
        exhibitionData: "",
        serviceData: "",
        adminData: "",
        systemData: ""
      }
    };
  },
  created() {
    this._getRoles();
  },
  methods: {
    _getRoles() {
      getRoles().then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.tableData = res.data;
        }
      });
    },
    _addRole() {
      console.log(this.dataAll);
      addRole(this.dataAll).then(res => {
        if (res.code === 0) {
          console.log("保存成功");
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.dialogFormVisible = false;
          this._getRoles();
        }
      });
    },
    _getRoleById(id) {
      getRoleById(id).then(res => {
        if (res.code === 0) {
          console.log("获取成功");
          console.log(res.data);
          var vm = this;
          this.dataAll.name = res.data.name;
          this.dataAll.note = res.data.note;
          if (res.data.bannerData !== "") {
            res.data.bannerData
              .split(",")
              .forEach(function(value, index, array) {
                vm.dataAll.bannerData.push(Number(value));
              });
          }
          if (res.data.enterpriseData !== "") {
            res.data.enterpriseData
              .split(",")
              .forEach(function(value, index, array) {
                vm.dataAll.enterpriseData.push(Number(value));
              });
          }
          if (res.data.exhibitionData !== "") {
            res.data.exhibitionData
              .split(",")
              .forEach(function(value, index, array) {
                vm.dataAll.exhibitionData.push(Number(value));
              });
          }
          if (res.data.serviceData !== "") {
            res.data.serviceData
              .split(",")
              .forEach(function(value, index, array) {
                vm.dataAll.serviceData.push(Number(value));
              });
          }
          if (res.data.adminData !== "") {
            res.data.adminData
              .split(",")
              .forEach(function(value, index, array) {
                vm.dataAll.adminData.push(Number(value));
              });
          }
          if (res.data.systemData !== "") {
            res.data.systemData
              .split(",")
              .forEach(function(value, index, array) {
                vm.dataAll.systemData.push(Number(value));
              });
          }
        }
      });
    },
    _editRole() {
      editRole(this.dataAll).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.dialogFormVisible = false;
        this._getRoles();
      });
    },
    handleCheckAllChange(value) {
      if (value) {
        this.dataAll.bannerData = [1, 2, 3, 4];
        this.dataAll.enterpriseData = [1, 2, 3];
        this.dataAll.exhibitionData = [1, 2, 3, 4, 5, 6];
        this.dataAll.serviceData = [1];
        this.dataAll.adminData = [1, 2, 3, 4, 5, 6];
        this.dataAll.systemData = [1];
      } else {
        this.dataAll.bannerData = [];
        this.dataAll.enterpriseData = [];
        this.dataAll.exhibitionData = [];
        this.dataAll.serviceData = [];
        this.dataAll.adminData = [];
        this.dataAll.systemData = [];
      }
    },
    quxiao() {
      this.dialogFormVisible = false;
    },
    trueover() {
      this.nameERR = "";
      console.log(this.dataAll);
      this.dataAll.bannerData = this.dataAll.bannerData.join();
      this.dataAll.enterpriseData = this.dataAll.enterpriseData.join();
      this.dataAll.exhibitionData = this.dataAll.exhibitionData.join();
      this.dataAll.serviceData = this.dataAll.serviceData.join();
      this.dataAll.adminData = this.dataAll.adminData.join();
      this.dataAll.systemData = this.dataAll.systemData.join();
      if (!this.dataAll.name) {
        this.nameERR = "请输入权限名称";
        return;
      }
      if (this.title === "新增权限管理") {
        this._addRole();
      } else {
        this._editRole();
      }
    },
    addRoles(id) {
      this.nameERR = "";
      this.checkAll = false;
      this.dialogFormVisible = true;
      this.dataAll.name = "";
      this.dataAll.bannerData = [];
      this.dataAll.enterpriseData = [];
      this.dataAll.exhibitionData = [];
      this.dataAll.serviceData = [];
      this.dataAll.adminData = [];
      this.dataAll.systemData = [];
      this.dataAll.note = "";
      this.dataAll.id = "";
      if (id) {
        this._getRoleById(id);
        this.title = "修改权限管理";
        this.dataAll.id = id;
      }
    },
    del(id) {
      this.$confirm("是否删除该权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteRole(id).then(res => {
          if (res.code === 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this._getRoles();
          }
        });
      });
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
