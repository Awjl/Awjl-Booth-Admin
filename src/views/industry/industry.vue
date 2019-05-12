<template>
  <div class="banner">
    <div class="banneradd">
      <el-input
        style="width: 150px;"
        class="filter-item"
        placeholder="请输入行业名称"
        v-model="upDataList.title"
      ></el-input>
      <el-select
        clearable
        style="width: 150px"
        class="filter-item"
        placeholder="选择是否上架"
        v-model="upDataList.isUpper"
      >
        <el-option label="已上架" :value="1">已上架</el-option>
        <el-option label="未上架" :value="2">未上架</el-option>
      </el-select>
      <el-date-picker
        v-model="dataArr"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="AddAdv()">新增一级行业</el-button>
    </div>
    <div class="dataAll-box">
      <div class="filter-container">
        <el-table :data="dataAll.list" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="industryName" label="一级行业名称" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1">显示</span>
              <span v-if="scope.row.state === 2">不显示</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="查看" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="showAddBox(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="AddAdv(scope.row.id, 1)">修改</el-button>
              <el-button type="danger" size="small" @click="_del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="upDataList.pageNum"
        :page-sizes="[10,20,30, 50]"
        :page-size="upDataList.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataAll.total"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="showdialogForm" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="20%" style="width: 80%;">
        <el-form-item label="一级行业名称" prop="name">
          <el-input placeholder="请输入一级行业名称" v-model="newIndustry.industryName"></el-input>
          <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-select style="width: 150px" class="filter-item" v-model="newIndustry.state">
            <el-option label="显示" :value="1">显示</el-option>
            <el-option label="不显示" :value="2">不显示</el-option>
          </el-select>
          <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="preservation">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showdialogFormTwo" title="二级行业列表">
      <el-form ref="dataForm" label-position="right" style="width: 100%;">
        <el-row>
          <el-col :span="24">
            <p style=" text-align: center;font-weight: bold;">二级行业列表</p>
            <div class="seachBox">
              <el-input
                style="width: 40%"
                class="filter-item"
                size="mini"
                placeholder="请输入二级行业名称"
                v-model="newIndustry.industryName"
              ></el-input>
              <el-select
                style="width: 150px;"
                size="mini"
                class="filter-item"
                v-model="newIndustry.state"
              >
                <el-option label="显示" :value="1">显示</el-option>
                <el-option label="不显示" :value="2">不显示</el-option>
              </el-select>
              <el-button
                class="filter-item"
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addTwoItem"
              ></el-button>
            </div>
            <ul class="participateList">
              <li v-for="(item, index) in rightList" :key="index">
                <span>{{item.industryName}}</span>
                <span v-if="item.state == 1">显示</span>
                <span v-if="item.state == 2">不显示</span>
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="AddAdv(item.id)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="_del(item.id)"></el-button>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getIndustryByCondition,
  addIndustry,
  getIndustryDetail,
  editIndustry,
  deleteIndustry,
  getTwoLevelIndustry
} from "@/api/login";
export default {
  data() {
    return {
      loading: false, // 是否有缓冲
      showdialogForm: false,
      showdialogFormTwo: false,
      dataArr: [],
      title: "一级行业设置",
      dataAll: {
        total: 1,
        list: []
      },
      rightList: [],
      upDataList: {
        name: null,
        state: null,
        pageNum: 1,
        pageSize: 10
      },
      newIndustry: {
        id: null,
        industryName: null,
        level: null,
        parentId: null,
        state: 1
      }
    };
  },
  created() {
    this._getIndustryByCondition();
  },
  methods: {
    _getIndustryByCondition() {
      getIndustryByCondition(this.upDataList).then(res => {
        if (res.code === 0) {
          this.dataAll = res.data;
        }
      });
    },
    _addIndustry() {
      this.newIndustry.level = 1;
      addIndustry(this.newIndustry).then(res => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.showdialogForm = false;
          this._getIndustryByCondition();
        }
      });
    },
    AddAdv(id, type) {
      this.newIndustry = {
        id: null,
        industryName: null,
        level: null,
        parentId: null,
        state: 1
      };
      if (type === 1) {
        this.title = "一级行业设置";
      }
      if (id) {
        if (this.title == "一级行业设置") {
          this.showdialogForm = true;
        }
        getIndustryDetail(id).then(res => {
          if (res.code === 0) {
            this.newIndustry = res.data;
          }
        });
      } else {
        if (this.title == "一级行业设置") {
          this.showdialogForm = true;
        }
      }
    },
    cancel() {
      this.showdialogForm = false;
    },
    preservation() {
      if (this.title == "新增一级行业") {
        this._addIndustry();
      } else {
        // this.newIndustry.level = 1;
        editIndustry(this.newIndustry).then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.showdialogForm = false;
            this.newIndustry = {
              id: null,
              industryName: null,
              level: null,
              parentId: null,
              state: 1
            };
            this._getIndustryByCondition();
          }
        });
      }
    },
    addTwoItem() {
      this.newIndustry.level = 2;
      if (this.newIndustry.id) {
        editIndustry(this.newIndustry).then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "修改成功"
            });

            getTwoLevelIndustry(this.newIndustry.parentId).then(res => {
              if (res.code === 0) {
                console.log(res.data);
                this.rightList = res.data;
                this.newIndustry = {
                  id: null,
                  industryName: null,
                  level: null,
                  parentId: null,
                  state: 1
                };
              }
            });
          }
        });
      } else {
        addIndustry(this.newIndustry).then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            getTwoLevelIndustry(this.newIndustry.parentId).then(res => {
              if (res.code === 0) {
                console.log(res.data);
                this.rightList = res.data;
                this.newIndustry = {
                  id: null,
                  industryName: null,
                  level: null,
                  parentId: null,
                  state: 1
                };
              }
            });
          }
        });
      }
    },
    showAddBox(id) {
      this.newIndustry.parentId = id;
      this.title = "";
      getTwoLevelIndustry(id).then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.rightList = res.data;
        }
      });
      this.showdialogFormTwo = true;
    },
    _del(id) {
      this.$confirm("是否删除该行业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteIndustry(id).then(res => {
            if (res.code === 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });

              if (this.newIndustry.parentId) {
                getTwoLevelIndustry(this.newIndustry.parentId).then(res => {
                  if (res.code === 0) {
                    console.log(res.data);
                    this.rightList = res.data;
                  }
                });
              } else {
                this._getIndustryByCondition();
              }
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
    handleSizeChange(val) {
      this.upDataList.pageSize = val;
      this._getIndustryByCondition();
    },
    handleCurrentChange(val) {
      this.upDataList.pageNum = val;
      this._getIndustryByCondition();
    }
  }
};
</script>
<style>
img {
  width: 100%;
}
.banneradd {
  margin: 30px;
}
.addbanner {
  width: 100%;
  text-align: center;
  font-size: 24px;
}
.dataAll-box {
  margin: 30px;
  min-height: 600px;
  border: 1px solid #ddd;
}
.upbtn {
  width: 100px;
  height: 30px;
  background: #66b1ff;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin-bottom: 50px;
}
.seachBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.participateList li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.participateList li {
  display: flex;
  height: 34px;
  align-items: center;
  width: 100%;
}
.participateList li span {
  display: block;
  width: 80%;
  height: 34px;
  line-height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.upbtn label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
}
.upbtn input {
  opacity: 0;
}
</style>
