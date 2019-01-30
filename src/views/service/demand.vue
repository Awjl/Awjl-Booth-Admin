<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入企业名称" v-model="upDataList.name"></el-input>
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
        <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
        <!-- <el-table-column prop="mobile" label="企业电话" align="center"></el-table-column> -->
        <el-table-column prop="email" label="企业邮箱" align="center"></el-table-column>
        <el-table-column prop="industryName" label="行业" align="center"></el-table-column>
        <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-if="scope.row.isConnected === 1"
              @click=" _isConnected(scope.row.id)"
            >去联系</el-button>
            <el-button type="success" size="small" v-if="scope.row.isConnected === 2" disabled>已联系</el-button>
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
    <!-- <el-dialog :visible.sync="dialogFormVisible" title="填写反馈">
      <el-form ref="dataForm" label-position="right" label-width="15%" style='width:90%; '>
        <el-form-item label="反馈">
           <el-input placeholder="请输入反馈内容" v-model="item.feedBack"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueover">保存</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
// getAllDemand
import { getAllDemand, isConnected } from "@/api/login";
export default {
  data() {
    return {
      loading: false,
      dataArr: [],
      dataAll: {
        total: 0,
        list: []
      },
      upDataList: {
        name: null,
        email: null,
        isConnected: null,
        beginDate: null,
        endDate: null,
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this._getAllDemand();
  },
  computed: {},
  methods: {
    _isConnected(id) {
      isConnected(id).then(res => {
        if (res.code === 0) {
          this._getAllDemand();
        }
      });
    },
    _getAllDemand() {
      getAllDemand(this.upDataList).then(res => {
        if (res.code === 0) {
          this.dataAll = res.data;
        }
      });
    },
    handleSizeChange(val) {
      this.upDataList.pageSize = val;
      this._getAllDemand();
    },
    handleCurrentChange(val) {
      this.upDataList.pageNum = val;
      this._getAllDemand();
    },
    suchbox() {
      this.upDataList.pageSize = 10;
      this.upDataList.pageNum = 1;
      if (this.dataArr !== []) {
        this.upDataList.beginDate = this.dataArr[0];
        this.upDataList.endDate = this.dataArr[1];
      }
      this._getAllDemand();
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
