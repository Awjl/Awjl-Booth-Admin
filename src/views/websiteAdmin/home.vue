<template>
  <div class="banner">
    <div class="banneradd">
      <el-input
        style="width: 150px;"
        class="filter-item"
        placeholder="请输入广告名称"
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
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="AddAdv()">新增广告</el-button>
    </div>
    <div class="dataAll-box">
      <div class="filter-container">
        <el-table :data="dataAll.list" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="title" label="广告名称" align="center"></el-table-column>
          <el-table-column label="广告位置" align="center">
            <template slot-scope="scope">
              <div class="box-img" v-if="scope.row.area === 1">A区广告位置</div>
              <div class="box-img" v-if="scope.row.area === 2">B区广告位置</div>
            </template>
          </el-table-column>
          <el-table-column prop="industryName" label="针对行业" align="center"></el-table-column>
          <!-- <el-table-column prop="imgurl" label="广告连接" align="center"></el-table-column> -->
          <el-table-column prop="url" label="图片展示" align="center">
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.url" alt align="center">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="upTime" label="上传时间" align="center">
            <!-- createDate -->
            <template slot-scope="scope">
              <div>{{scope.row.createDate}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="edit(scope.row.id)">修改</el-button>
              <el-button
                type="success"
                size="small"
                v-if="scope.row.isUpper === 2"
                @click="_isUpperAdvert(scope.row.id, 1)"
              >上架</el-button>
              <el-button
                type="warning"
                size="small"
                v-if="scope.row.isUpper === 1"
                @click="_isUpperAdvert(scope.row.id, 2)"
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
    <el-dialog :visible.sync="showdialogForm" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="20%" style="width: 80%;">
        <el-form-item label="广告名称" prop="name">
          <el-input placeholder="请输入广告名称" v-model="newBanner.title"></el-input>
          <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
        </el-form-item>
        <el-form-item label="广告位置">
          <el-select style="width: 150px" class="filter-item" v-model="newBanner.area">
            <el-option label="A区" :value="1">A区</el-option>
            <el-option label="B区" :value="2">B区</el-option>
          </el-select>
          <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select style="width: 150px" class="filter-item" v-model="newBanner.isUpper">
            <el-option label="上架" :value="1">上架</el-option>
            <el-option label="下架" :value="2">下架</el-option>
          </el-select>
          <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
        </el-form-item>
        <el-form-item label="针对行业">
          <el-select
            style="width: 150px"
            class="filter-item"
            v-model="newBanner.oneIndustry"
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
            v-model="newBanner.twoIndustry"
            placeholder="次级行业"
            @change="currentSelTwo"
          >
            <el-option
              :value="item.id"
              :label="item.industryName"
              v-for="(item, index) in dataItem"
              :key="index"
            >{{item.industryName}}</el-option>
          </el-select>
          <!-- <span style="position: absolute;bottom:-30px;left:0px;color:red"></span> -->
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upbtn">
            <label for="up">预览图片</label>
            <input @change="upimages" type="file" id="up" value="图片上传预览">
          </div>
          <img :src="newBanner.imagesUrl" v-if="newBanner.imagesUrl">
          <span style="position: absolute;top:20px;left:0px;color:red"></span>
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
  getAllAdvert,
  addAdvert,
  isUpperAdvert,
  getIndustry,
  deletePointGoods,
  editAdvert,
  getAdvertById
} from "@/api/login";
import { ERR_OK } from "@/api/config";
export default {
  data() {
    return {
      loading: false, // 是否有缓冲
      showdialogForm: false,
      title: "",
      avatar: "",
      dataArr: [],
      dataList: [],
      dataItem: [],
      imgType: {
        type: "image/jpeg, image/png, image/jpg"
      },
      dataAll: {
        total: 1,
        list: []
      },
      upDataList: {
        title: null,
        firstIndustryId: null,
        secondIndustryId: null,
        area: null,
        isUpper: null,
        beginDate: null,
        endDate: null,
        pageNum: 1,
        pageSize: 10
      },
      twoList: "",
      newBanner: {
        id: "",
        title: "",
        oneIndustry: 1,
        twoIndustry: null,
        imagesUrl: "",
        area: 1,
        isUpper: 1,
        pic: "",
        industryName: ""
      },
      upData: new FormData()
    };
  },
  computed: {},
  created() {
    this._getIndustry();
  },
  methods: {
    _isUpperAdvert(id, isupper) {
      isUpperAdvert(id, isupper).then(res => {
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
          this._getAllAdvert();
        }
      });
    },
    _getAdvertById(id) {
      getAdvertById(id).then(res => {
        if (res.code === ERR_OK) {
          // this.newBanner
          console.log(res);

          this.newBanner.title = res.data.title;
          this.newBanner.oneIndustry = res.data.oneIndustryid;
          this.dataItem = this.dataList[
            this.newBanner.oneIndustry - 1
          ].secondIndustries;
          this.newBanner.twoIndustry = res.data.twoIndustry;
          this.newBanner.imagesUrl = res.data.url;
          this.newBanner.industryName = res.data.industryName;
          this.newBanner.isUpper = res.data.isUpper;
          this.newBanner.area = res.data.area;
          this.newBanner.id = res.data.id;
          this.newBanner.pic = null;
        }
      });
    },
    _del(id) {
      this.$confirm("是否删除该广告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePointGoods(id).then(res => {
            if (res.code === ERR_OK) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.upDataList.pageSize = 10;
              this.upDataList.pageNum = 1;
              this._getAllAdvert();
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
    _getIndustry() {
      getIndustry().then(res => {
        this.dataList = res.data;
        this.dataItem = this.dataList[0].secondIndustries;
        this._getAllAdvert();
      });
    },
    _getAllAdvert() {
      getAllAdvert(this.upDataList).then(res => {
        if (res.code === ERR_OK) {
          this.dataAll = res.data;
        }
      });
    },
    _editAdvert() {
      this.upData.append("id", this.newBanner.id);
      this.upData.append("title", this.newBanner.title);
      this.upData.append("isUpper", this.newBanner.isUpper);
      this.upData.append("pic", this.newBanner.pic);
      if (this.newBanner.twoIndustry) {
        this.upData.append("twoIndustry", this.newBanner.twoIndustry);
      } else {
        this.upData.append("twoIndustry", 0);
      }
      this.upData.append("oneIndustry", this.newBanner.oneIndustry);
      this.upData.append("area", this.newBanner.area);
      this.upData.append("industryName", this.newBanner.industryName);
      editAdvert(this.upData).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.showdialogForm = false;
          this.upDataList.pageSize = 10;
          this.upDataList.pageNum = 1;
          this._getAllAdvert();
        }
      });
    },
    _addAdvert() {
      this.upData.append("title", this.newBanner.title);
      this.upData.append("isUpper", this.newBanner.isUpper);
      this.upData.append("pic", this.newBanner.pic);
      this.upData.append("oneIndustry", this.newBanner.oneIndustry);
      if (this.newBanner.twoIndustry) {
        this.upData.append("twoIndustry", this.newBanner.twoIndustry);
      } else {
        this.upData.append("twoIndustry", 0);
      }
      this.upData.append("area", this.newBanner.area);
      this.upData.append("industryName", this.newBanner.industryName);

      addAdvert(this.upData).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.showdialogForm = false;
          this.upDataList.pageSize = 10;
          this.upDataList.pageNum = 1;
          this._getAllAdvert();
        }
      });
    },
    currentSel() {
      this.newBanner.twoIndustry = "";
      this.newBanner.industryName = this.dataList[
        this.newBanner.oneIndustry - 1
      ].industryName;
      this.dataItem = this.dataList[
        this.newBanner.oneIndustry - 1
      ].secondIndustries;
    },
    currentSelTwo(vId) {
      let obj = {};
      obj = this.dataItem.find(item => {
        return item.id === vId;
      });
      this.newBanner.industryName = obj.industryName;
    },
    edit(id) {
      this.upData = new FormData();
      this.newBanner = {
        id: "",
        title: "",
        oneIndustry: 1,
        twoIndustry: null,
        imagesUrl: "",
        area: 1,
        isUpper: 1,
        pic: "",
        industryName: ""
      };
      this.showdialogForm = true;
      this.title = "修改广告";
      this._getAdvertById(id);
    },
    AddAdv() {
      this.upData = new FormData();
      this.newBanner = {
        id: "",
        title: "",
        oneIndustry: 1,
        twoIndustry: null,
        imagesUrl: "",
        area: 1,
        isUpper: 1,
        pic: "",
        industryName: ""
      };
      this.showdialogForm = true;
      this.title = "新增广告";
    },
    upimages(e) {
      var avatarImg = e.target.files[0];
      var avatarImgsize = avatarImg.size;
      var avatarImgtype = avatarImg.type;
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error("格式不正确");
        return false;
      } else if (avatarImgsize > 5242880) {
        this.$message.error("图片太大了");
        return false;
      } else {
        const _this = this;
        if (!e || !window.FileReader) return;
        const reader = new FileReader();
        reader.readAsDataURL(avatarImg);
        reader.onload = function(e) {
          _this.newBanner.imagesUrl = e.target.result;
        };
        this.newBanner.pic = avatarImg;
      }
    },
    preservation() {
      if (this.title === "新增广告") {
        this._addAdvert();
      } else {
        this._editAdvert();
      }
    },
    cancel() {
      this.showdialogForm = false;
    },
    handleSizeChange(val) {
      this.upDataList.pageSize = val;
      this._getAllAdvert();
    },
    handleCurrentChange(val) {
      this.upDataList.pageNum = val;
      this._getAllAdvert();
    },
    suchbox() {
      this.upDataList.pageSize = 10;
      this.upDataList.pageNum = 1;
      if (this.dataArr !== []) {
        this.upDataList.beginDate = this.dataArr[0];
        this.upDataList.endDate = this.dataArr[1];
      }
      this._getAllAdvert();
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
