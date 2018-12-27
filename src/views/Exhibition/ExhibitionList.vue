<template>
  <div class='banner'>
    <div class='banneradd'>
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入会展名称" >
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item"  placeholder="选择会展状态" v-model="dataAll.isUpper">
        <el-option label="已开展" :value="1">
          已开展
        </el-option>
        <el-option label="未开展" :value="2">
          未开展
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type='primary' icon='el-icon-plus' @click='toExhibition(null)'>添加展会</el-button>
    </div>
    <div class='dataAll-box'>
      <div class='filter-container'>
        <el-table :data='dataAll.dataList' border style='width: 100%' v-loading='loading'>
          <el-table-column prop='id' label='ID' align='center'></el-table-column>
          <el-table-column prop='titel' label='会展名称' align='center'></el-table-column>
          <el-table-column label='会展图片' align='center'>
            <template slot-scope='scope'>
              <div class='box-img'>
                <img :src='scope.row.logo' alt align='center'>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop='num' label='会展地址' align='center'></el-table-column>
          <el-table-column prop='industry' label='所属行业' align='center'></el-table-column>
          <el-table-column prop='Customer' label='会展参展商数量' align='center'></el-table-column>
          <el-table-column prop='upTime' label='会展时间' align='center'></el-table-column>
          <el-table-column label='操作' align='center'>
            <template slot-scope='scope'>
              <el-button type='primary' size='small'>修改</el-button>
              <el-button type='danger' size='small'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class='pagination-container'>
      <el-pagination
        background
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :current-page='dataAll.page'
        :page-sizes='[10,20,30, 50]'
        :page-size='dataAll.limit'
        layout='total, sizes, prev, pager, next, jumper'
        :total='dataAll.total'
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, // 是否有缓冲
      dataArr: [],
      dataAll: {
        page: 1,
        limit: 10,
        total: 100,
        isUpper: '',
        dataList: [
          {
            id: '100',
            titel: '漫展',
            num: '上海市黄浦区',
            Customer: '10',
            industry: '金融，木材，保险',
            imgurl:
              'http://www.shiccs.net/pictures/index/topBanner2_20181126143140731.jpg',
            logo:
              'http://www.shiccs.net/pictures/index/topBanner2_20181126143140731.jpg',
            upTime: '2018-08-08至2018-09-09'
          }
        ]
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    toExhibition(id) {
      this.$router.push({
        path: `/Exhibition/ExhibitionDetails/${id}`
      })
    },
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
