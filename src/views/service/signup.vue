<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入企业名称">
      </el-input>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" >搜索</el-button>
      <div class="he20"></div>
      <el-table :data="dataAll.dataList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID"  align="center">
        </el-table-column>
        <el-table-column prop="name" label="会展名称"  align="center">
        </el-table-column>
        <el-table-column prop="hang" label="所属行业"  align="center">
        </el-table-column>
        <el-table-column prop="Time" label="会展时间"  align="center">
        </el-table-column>
        <el-table-column prop="title" label="报名企业"  align="center">
        </el-table-column>
        <el-table-column prop="num" label="参加时间"  align="center">
        </el-table-column>
        <el-table-column prop="bookDate" label="申请时间"  align="center">
        </el-table-column>
        <el-table-column label="操作"  align="center" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="small">未通过报名</el-button>
            <el-button type="success" size="small">通过报名</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="dataAll.page" :page-sizes="[10,20,30, 50]" :page-size="dataAll.limit" layout="total, sizes, prev, pager, next, jumper" :total="dataAll.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
      dataArr: [],
      dataAll: {
        page: 1,
        limit: 10,
        total: 100,
        isUpper: '',
        dataList: [
          {
            id: '100',
            name: '进口博览会',
            hang: '金融，属性，保险',
            Time: '2018-09-09至10-01',
            title: '阿里巴巴',
            num: '2018-09-15',
            bookDate: '2018-09-10'
          }
        ]
      }
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    handleSizeChange(val) {
      this.dataAll.limit = val
    },
    handleCurrentChange(val) {
      this.dataAll.page = val
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
