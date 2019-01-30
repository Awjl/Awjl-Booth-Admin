<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入企业名称" v-model="upDataList.companyName"></el-input>
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
      <div class="he20"></div>
      <el-table :data="dataAll.list" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="会展名称" align="center"></el-table-column>
        <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
        <el-table-column prop="date" label="会展时间" align="center"></el-table-column>
        <el-table-column prop="companyName" label="报名企业" align="center"></el-table-column>
        <el-table-column prop="precentDate" label="参加时间" align="center"></el-table-column>
        <el-table-column prop="createDate" label="申请时间" align="center"></el-table-column>
        <!-- <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="small">未通过报名</el-button>
            <el-button type="success" size="small">通过报名</el-button>
          </template>
        </el-table-column> -->
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
  </div>
</template>
<script>
import { getAllEnroll } from "@/api/login";

// getAllEnroll
export default {
  data() {
    return {
      loading: false,
      dataArr: [],
      dataAll: {
        total: 100,
        list: []
      },
      upDataList: {
        companyName: null,
        name: null,
        mobile: null,
        title: null,
        beginDate: null,
        endDate: null,
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this._getAllEnroll();
  },
  computed: {},
  methods: {
    _getAllEnroll() {
      getAllEnroll(this.upDataList).then(res => {
        if (res.code === 0) {
          this.dataAll = res.data;
        }
      });
    },
    handleSizeChange(val) {
      this.upDataList.pageSize = val;
      this._getAllEnroll();
    },
    handleCurrentChange(val) {
      this.upDataList.pageNum = val;
      this._getAllEnroll();
    },
    suchbox() {
      this.upDataList.pageSize = 10;
      this.upDataList.pageNum = 1;
      if (this.dataArr !== []) {
        this.upDataList.beginDate = this.dataArr[0];
        this.upDataList.endDate = this.dataArr[1];
      }
      this._getAllEnroll();
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
