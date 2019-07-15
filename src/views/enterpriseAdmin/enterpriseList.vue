<template>
  <div class="banner">
    <div class="banneradd">
      <el-input
        style="width: 150px;"
        class="filter-item"
        placeholder="请输入企业名称"
        v-model="upDataList.name"
      ></el-input>
      <el-select
        clearable
        style="width: 150px"
        class="filter-item"
         placeholder="选择认证状态"
        v-model="upDataList.isAuthenticate"
      >
         <el-option label="已认证" :value="0">等待认证</el-option>
        <el-option label="未认证" :value="1">已认证</el-option>
        <el-option label="未认证" :value="2">未认证</el-option>
      </el-select>
      <el-select
        clearable
        style="width: 150px"
        class="filter-item"
        placeholder="选择企业动态"
        v-model="upDataList.isActivate"
      >
        <el-option label="已冻结" :value="2">已冻结</el-option>
        <el-option label="未冻结" :value="1">未冻结</el-option>
        <!-- <el-option label="未认证" :value="2">未认证</el-option> -->
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
      <el-button class="filter-item" type="primary" @click="pushMover">推送</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="toDetails(null)"
      >添加企业</el-button>
    </div>
    <div class="dataAll-box">
      <div class="filter-container">
        <el-table :data="dataAll.list" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
          <el-table-column label="企业Logo" align="center">
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.logoUrl" alt align="center">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
          <el-table-column prop="customer" label="主要客户" align="center">
            <template slot-scope="scope">
              <div
                v-for="(item, index) in JSON.parse(scope.row.customer)"
                :key="index"
                v-show="item.key != `点击输入`"
              >{{item.key}}</div>
              <!-- <div v-if="scope.row.customer.split('点击输入').length - 1 == 5">暂无数据</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="facilitator" label="主要供应商" align="center">
            <template slot-scope="scope">
              <div
                v-for="(item, index) in JSON.parse(scope.row.facilitator)"
                :key="index"
                v-show="item.key != `点击输入`"
              >{{item.key}}</div>
              <!-- <div v-if="scope.row.facilitator.split('点击输入').length - 1 == 5">暂无数据</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="本站注册时间" align="center">
            <template slot-scope="scope">
              <p>{{`${new Date(scope.row.createDate).getFullYear()}/${ 10 > (new Date(scope.row.createDate).getMonth() + 1) ? '0' + (new Date(scope.row.createDate).getMonth()+ 1) : new Date(scope.row.createDate).getMonth()}/${ 10 > new Date(scope.row.createDate).getDate() ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate()}`}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="isAuthenticate" label="认证状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.isAuthenticate === 0">等待认证</div>
              <div v-if="scope.row.isAuthenticate === 1">已认证</div>
              <div v-if="scope.row.isAuthenticate === 2">认证失败</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="350">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="small"
                @click="_authenticateCompany(scope.row.id, 1)"
                v-if="scope.row.isAuthenticate === 0"
              >通过认证</el-button>
              <el-button
                type="warning "
                size="small"
                @click="_authenticateCompany(scope.row.id, 2)"
                v-if="scope.row.isAuthenticate === 0"
              >认证失败</el-button>
              <el-button
                size="small"
                @click="_recommendCompany(scope.row.id, 1)"
                v-if="scope.row.isRecommend === 2"
              >推荐至首页</el-button>
              <el-button size="small" @click="_recommendCompany(scope.row.id, 2)" v-else>取消推荐</el-button>
              <el-button type="primary" size="small" @click="toDetails(scope.row.id)">修改企业</el-button>
              <el-button
                type="danger"
                size="small"
                v-if="scope.row.isActivate === 1"
                @click="_setfreeze(scope.row.id, 2)"
              >冻结</el-button>
              <el-button
                type="success"
                size="small"
                v-if="scope.row.isActivate !== 1"
                @click="_setfreeze(scope.row.id, 1)"
              >解冻</el-button>
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
    <el-dialog :visible.sync="showTwo" title="推荐列表">
      <el-form ref="dataForm" label-position="right" style="width: 100%;">
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
        <p style="font-weight: bold;text-align: center;">被推送公司</p>
        <div>
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox
              v-for="(item, index) in AllExhibitionList"
              :label="item.id"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <p style="font-weight: bold;text-align: center;">推送目标</p>
        <div>
          <el-checkbox-group v-model="allList">
            <el-checkbox
              v-for="(item, index) in AllExhibitionList"
              :label="item.id"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
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
  getAllCompany,
  getIndustry,
  getAllCompanyByIndustryAndArea,
  pushCompany,
  recommendCompany,
  authenticateCompany,
  freezeCompany
} from "@/api/login";
export default {
  data() {
    return {
      showTwo: false,
      loading: false, // 是否有缓冲
      dataArr: [],
      dataList: [],
      dataItem: [],
      upDataList: {
        name: null,
        email: null,
        firstIndustryId: null,
        secondIndustryId: null,
        isRecommend: null,
        isAuthenticate: null,
        isActivate: null,
        beginDate: null,
        endDate: null,
        pageNum: 1,
        pageSize: 10
      },
      dataAll: {
        total: 0,
        list: []
      },
      upSearchList: {
        firstIndustryId: "",
        secondIndustryId: "",
        area: ""
      },
      AllExhibitionList: [],
      allList: [],
      checkedCities: []
    };
  },
  computed: {},
  created() {
    this._getIndustry();
    this._getAllCompany();
  },
  methods: {
    _setfreeze(idtitle, type) {
      let parmes = {
        id: idtitle,
        type: type
      };
      // console.log(parmes)
      freezeCompany(parmes).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "企业状态修改成功"
          });
          this._getAllCompany();
        }
      });
    },
    _authenticateCompany(id, type) {
      authenticateCompany(id, type).then(res => {
        if (res.code === 0) {
          this._getAllCompany();
        }
      });
    },
    _recommendCompany(id, isRecommend) {
      recommendCompany(id, isRecommend).then(res => {
        if (res.code === 0) {
          this._getAllCompany();
        }
      });
    },
    _getAllCompanyByIndustryAndArea() {
      getAllCompanyByIndustryAndArea(this.upSearchList).then(res => {
        if (res.code === 0) {
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
    _getAllCompany() {
      getAllCompany(this.upDataList).then(res => {
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
    toDetails(id) {
      console.log(id);
      this.$router.push({
        path: `/enterpriseDetails/${id}`
      });
    },
    pushMover() {
      this.showTwo = true;
    },
    handleSizeChange(val) {
      this.upDataList.pageSize = val;
      this._getAllCompany();
    },
    handleCurrentChange(val) {
      this.upDataList.pageNum = val;
      this._getAllCompany();
    },
    suchbox() {
      this.upDataList.pageSize = 10;
      this.upDataList.pageNum = 1;
      if (this.dataArr !== []) {
        this.upDataList.beginDate = this.dataArr[0];
        this.upDataList.endDate = this.dataArr[1];
      }
      this._getAllCompany();
    },
    cancel() {
      this.showTwo = false;
    },
    preservation() {
      pushCompany(this.checkedCities, this.allList).then(res => {
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
