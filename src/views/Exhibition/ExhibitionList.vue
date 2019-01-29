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
              <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
import { getAllExhibition, isUpperExhibition } from "@/api/login";

export default {
  data() {
    return {
      loading: false, // 是否有缓冲
      dataArr: [],
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
      }
    };
  },
  computed: {},
  created() {
    this._getAllExhibition();
  },
  methods: {
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
