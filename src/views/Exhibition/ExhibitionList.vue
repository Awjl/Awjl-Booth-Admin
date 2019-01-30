<template>
  <div class="banner">
    <div class="banneradd">
      <el-input
        style="width: 150px;"
        class="filter-item"
        placeholder="请输入会展名称"
        v-model="upDataList.name"
      ></el-input>
      <el-select
        clearable
        style="width: 150px"
        class="filter-item"
        placeholder="选择会展状态"
        v-model="upDataList.isUpper"
      >
        <el-option label="已上架" :value="1">已上架</el-option>
        <el-option label="已下架" :value="2">已下架</el-option>
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
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="pushMover">推送</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="toExhibition(null)">添加展会</el-button>
    </div>
    <div class="dataAll-box">
      <div class="filter-container">
        <el-table :data="dataAll.list" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="name" label="会展名称" align="center"></el-table-column>
          <el-table-column label="会展图片" align="center">
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.summaryPicture" alt align="center">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="location" label="会展地址" align="center"></el-table-column>
          <el-table-column prop="title" label="主题" align="center"></el-table-column>
          <el-table-column prop="summary" label="简介" align="center"></el-table-column>
          <el-table-column prop="date" label="会展时间" align="center"></el-table-column>
          <el-table-column prop="date" label="查看" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="showAddBox(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="toExhibition(scope.row.id)">修改</el-button>
              <el-button
                type="success"
                size="small"
                v-if="scope.row.isUpper === 2"
                @click="_isUpperExhibition(scope.row.id, 1)"
              >上架</el-button>
              <el-button
                type="warning"
                size="small"
                v-if="scope.row.isUpper === 1"
                @click="_isUpperExhibition(scope.row.id, 2)"
              >下架</el-button>
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
    <el-dialog :visible.sync="showdialogForm" title="参展商/到访商列表">
      <el-form ref="dataForm" label-position="right" style="width: 100%;">
        <el-row>
          <el-col :span="12">
            <p style=" text-align: center;font-weight: bold;">参展商列表</p>
            <div class="seachBox">
              <el-input
                style="width: 80%"
                class="filter-item"
                size="mini"
                placeholder="请输入参展商名称"
                v-on:input="inputFunc"
                v-model="center"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addOneItem"
              ></el-button>
              <div class="seachBoxList" v-if="oneBox">
                <div
                  class="seachBoxItem"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click="addOne(item.screenName)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <ul class="participateList">
              <li v-for="(item, index) in leftList" :key="index">
                <span>{{item.name}}</span>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="_deleteExhibitior(item.exhibitorId)"
                ></el-button>
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <p style=" text-align: center;font-weight: bold;">到访商列表</p>
            <div class="seachBox">
              <el-input
                style="width: 80%"
                class="filter-item"
                size="mini"
                placeholder="请输入到访商名称"
                v-on:input="inputFuncOne"
                v-model="centerOne"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addTwoItem"
              ></el-button>
              <div class="seachBoxList" v-if="twoBox">
                <div
                  class="seachBoxItem"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click="addTwo(item.screenName)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <ul class="participateList">
              <li v-for="(item, index) in rightList" :key="index">
                <span>{{item.name}}</span>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="_deleteExhibitior(item.exhibitorId)"
                ></el-button>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <!-- <el-button type="primary" @click="preservation">保存</el-button> -->
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showTwo" title="推荐列表">
      <el-form ref="dataForm" label-position="right" style="width: 100%;">
        <el-form-item label="全部会展">
          <template>
            <el-checkbox-group v-model="checkedCities">
              <el-checkbox
                v-for="(item, index) in dataAll.list"
                :label="item.id"
                :key="index"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="搜索公司">
          <el-select
            style="width: 150px"
            class="filter-item"
            placeholder="一级行业"
            v-model="upSearchList.firstIndustryId"
            @change="currentSel"
          >
            <el-option
              :value="item.id"
              :label="item.industryName"
              v-for="(item, index) in dataList"
              :key="index"
            >{{item.industryName}}</el-option>
          </el-select>
          <el-select
            style="width: 150px"
            class="filter-item"
            v-model="upSearchList.secondIndustryId"
            placeholder="次级行业"
          >
            <el-option
              :value="item.id"
              :label="item.industryName"
              v-for="(item, index) in dataItem"
              :key="index"
            >{{item.industryName}}</el-option>
          </el-select>
          <el-input
            style="width: 150px;"
            class="filter-item"
            placeholder="请输入地区"
            v-model="upDataList.area"
          ></el-input>
          <el-button class="filter-item" type="primary" @click="_getAllCompanyByIndustryAndArea">搜索</el-button>
        </el-form-item>
        <el-form-item label="公司列表">
          <template>
            <el-checkbox-group v-model="allList">
              <el-checkbox
                v-for="(item, index) in AllExhibitionList"
                :label="item.id"
                :key="index"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="preservation">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllExhibition,
  isUpperExhibition,
  deleteExhibition,
  searchCompany,
  addExhibitior,
  getAllExhibitiors,
  deleteExhibitior,
  getIndustry,
  getAllCompanyByIndustryAndArea,
  pushExhibitionInfo
} from "@/api/login";

export default {
  data() {
    return {
      checkedCities: [],
      oneBox: false,
      twoBox: false,
      loading: false, // 是否有缓冲
      showdialogForm: false,
      showTwo: false,
      timer: "",
      center: "",
      serachList: [],
      centerOne: "",
      dataArr: [],
      dataList: [],
      dataItem: [],
      dataAll: {
        total: 0,
        list: []
      },
      upDataList: {
        title: null,
        name: null,
        nameEng: null,
        date: null,
        isUpper: null,
        beginDate: null,
        endDate: null,
        pageNum: 1,
        pageSize: 10
      },
      UpItem: {
        exhibitionId: "",
        name: "",
        type: ""
      },
      leftList: [],
      rightList: [],
      upSearchList: {
        firstIndustryId: "",
        secondIndustryId: "",
        area: ""
      },
      AllExhibitionList: [],
      allList: []
    };
  },

  computed: {},
  created() {
    this._getIndustry();
    this._getAllExhibition();
  },
  methods: {
    _getAllCompanyByIndustryAndArea() {
      getAllCompanyByIndustryAndArea(this.upSearchList).then(res => {
        if (res.code === 0) {
          console.log(res);
          this.AllExhibitionList = res.data;
        }
      });
    },
    _getIndustry(id) {
      getIndustry(id).then(res => {
        this.dataList = res.data;
        this.dataItem = this.dataList[0].secondIndustries;
      });
    },
    _addExhibitior() {
      addExhibitior(this.UpItem).then(res => {
        if (res.code === 0) {
          this.center = "";
          this.centerOne = "";
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this._getAllExhibitiors(this.UpItem.exhibitionId, "", 1);
          this._getAllExhibitiors(this.UpItem.exhibitionId, "", 2);
        }
      });
    },
    _deleteExhibitior(id) {
      console.log(id);
      deleteExhibitior(id).then(res => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this._getAllExhibitiors(this.UpItem.exhibitionId, "", 1);
          this._getAllExhibitiors(this.UpItem.exhibitionId, "", 2);
        }
      });
    },
    _getAllExhibitiors(exhibitionId, content, type) {
      getAllExhibitiors(exhibitionId, content, type).then(res => {
        if (res.code === 0) {
          if (type === 1) {
            this.leftList = res.data;
          } else {
            this.rightList = res.data;
          }
        }
      });
    },
    _searchCompany(center) {
      searchCompany(center).then(res => {
        this.serachList = res.data;
      });
    },
    setTime(center) {
      this.timer = setTimeout(() => {
        this._searchCompany(center);
      }, 500);
    },
    _del(id) {
      this.$confirm("是否删除该展会?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteExhibition(id).then(res => {
            console.log(res);
            if (res.code === 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.upDataList.pageSize = 10;
              this.upDataList.pageNum = 1;
              this._getAllExhibition();
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
    _isUpperExhibition(id, isupper) {
      isUpperExhibition(id, isupper).then(res => {
        if (res.code === 0) {
          if (isupper === 1) {
            this.$message({
              type: "success",
              message: "上架成功"
            });
          } else {
            this.$message({
              type: "success",
              message: "下架成功"
            });
          }
          this._getAllExhibition();
        }
      });
    },
    _getAllExhibition() {
      getAllExhibition(this.upDataList).then(res => {
        if (res.code === 0) {
          this.dataAll = res.data;
        }
      });
    },
    currentSel() {
      this.upSearchList.secondIndustryId = "";
      this.dataItem = this.dataList[
        this.upSearchList.firstIndustryId - 1
      ].secondIndustries;
    },
    pushMover() {
      this.showTwo = true;
    },
    showAddBox(id) {
      this.UpItem.exhibitionId = id;
      this.showdialogForm = true;
      this._getAllExhibitiors(id, "", 1);
      this._getAllExhibitiors(id, "", 2);
    },
    addOneItem() {
      this.UpItem.type = 1;
      this.UpItem.name = this.center;
      this.oneBox = false;
      this.twoBox = false;
      this._addExhibitior();
    },
    addTwoItem() {
      this.UpItem.type = 2;
      this.UpItem.name = this.centerOne;
      this.oneBox = false;
      this.twoBox = false;
      this._addExhibitior();
    },
    addOne(name) {
      this.center = name;
      this.oneBox = false;
    },
    addTwo(name) {
      this.centerOne = name;
      this.twoBox = false;
    },
    inputFunc() {
      // 搜索 1
      this.oneBox = true;
      this.twoBox = false;
      clearInterval(this.timer);
      this.setTime(this.center);
    },
    inputFuncOne() {
      this.oneBox = false;
      this.twoBox = true;
      clearInterval(this.timer);
      this.setTime(this.centerOne);
    },
    toExhibition(id) {
      this.$router.push({
        path: `/Exhibition/ExhibitionDetails/${id}`
      });
    },
    handleSizeChange(val) {
      this.upDataList.pageSize = val;
      this._getAllExhibition();
    },
    handleCurrentChange(val) {
      this.upDataList.pageNum = val;
      this._getAllExhibition();
    },
    suchbox() {
      this.upDataList.pageSize = 10;
      this.upDataList.pageNum = 1;
      if (this.dataArr !== []) {
        this.upDataList.beginDate = this.dataArr[0];
        this.upDataList.endDate = this.dataArr[1];
      }
      this._getAllExhibition();
    },
    cancel() {
      this.showdialogForm = false;
    },
    preservation() {
      pushExhibitionInfo(this.allList, this.checkedCities).then(res => {
        if (res.code === 0) {
          this.showTwo = false;
          this.$message({
            type: "success",
            message: "推送成功"
          });
        }
      });
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
.seachBox {
  position: relative;
}
.seachBoxList {
  position: absolute;
  top: 30px;
  left: 0;
  background: #fff;
  width: 80%;
  box-shadow: 0px 0px 5px #888888;
  max-height: 100px;
  overflow: auto;
}
.seachBoxItem {
  padding: 0 10px;
  box-sizing: border-box;
}
.seachBoxItem:hover {
  background: #ddd;
  cursor: pointer;
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
.participateList,
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
