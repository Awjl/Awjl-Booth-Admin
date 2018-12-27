<template>
  <div class='banner'>
    <div class='banneradd'>
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入广告名称" >
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item"  placeholder="选择是否上架" v-model="dataAll.isUpper">
        <el-option label="已上架" :value="1">
          已上架
        </el-option>
        <el-option label="未上架" :value="2">
          未上架
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type='primary' icon='el-icon-plus' @click='AddAdv()'>新增广告</el-button>
    </div>
    <div class='dataAll-box'>
      <div class='filter-container'>
        <el-table :data='dataAll.dataList' border style='width: 100%' v-loading='loading'>
          <el-table-column prop='id' label='ID' align='center'></el-table-column>
          <el-table-column prop='titel' label='广告名称' align='center'></el-table-column>
          <el-table-column prop='position' label='广告位置' align='center'></el-table-column>
          <el-table-column prop='industry' label='针对行业' align='center'></el-table-column>
          <el-table-column prop='imgurl' label='广告连接' align='center'></el-table-column>
          <el-table-column prop='url' label='图片展示' align='center'>
            <template slot-scope='scope'>
              <div class='box-img'>
                <img :src='scope.row.url' alt align='center'>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop='upTime' label='上传时间' align='center'></el-table-column>
          <el-table-column label='操作' align='center'>
            <template slot-scope='scope'>
              <el-button type='danger' size='small'>删除</el-button>
              <el-button type='warning' size='small'>上架</el-button>
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
    <el-dialog :visible.sync='showdialogForm' :title='title'>
      <el-form ref='dataForm' label-position='right' label-width='20%' style='width: 80%;'>
        <el-form-item label='广告名称' prop='name'>
          <el-input placeholder='请输入广告名称' v-model="newBanner.title"></el-input>
          <span style='position: absolute;bottom:-30px;left:0px;color:red'></span>
        </el-form-item>
        <el-form-item label='广告连接'>
           <el-input placeholder='请输入广告地址' v-model="newBanner.imagesUrl"></el-input>
          <span style='position: absolute;bottom:-30px;left:0px;color:red'></span>
        </el-form-item>
        <el-form-item label='广告位置'>
          <el-select clearable style="width: 150px" class="filter-item"  placeholder="选择广告位置" v-model="dataAll.isUpper">
        <el-option label="首页A区" :value="1">
          首页A区
        </el-option>
        <el-option label="首页B区" :value="2">
          首页B区
        </el-option>
      </el-select>
          <span style='position: absolute;bottom:-30px;left:0px;color:red'></span>
        </el-form-item>
        <el-form-item label='针对行业'>
          <div>金融行业</div>
           <el-checkbox-group v-model="dataItem">
            <el-checkbox v-for="(item, index) in dataList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <span style='position: absolute;bottom:-30px;left:0px;color:red'></span>
        </el-form-item>
        <el-form-item label='添加图片'>
          <div class='upbtn'>
            <label for='up'>预览图片</label>
            <input @change='upimages' type='file' id='up' value='图片上传预览'>
          </div>
          <img :src='newBanner.avatar' v-if='newBanner.avatar'>
          <span style='position: absolute;top:20px;left:0px;color:red'></span>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='cancel'>取消</el-button>
        <el-button type='primary' @click='preservation'>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, // 是否有缓冲
      showdialogForm: false,
      title: '新增广告',
      avatar: '',
      dataArr: [],
      dataList: [{ key: 1, name: '金融行业' }, { key: 2, name: '金融行业' }, { key: 3, name: '金融行业' }, { key: 4, name: '金融行业' }, { key: 5, name: '金融行业' }, { key: 6, name: '金融行业' }],
      dataItem: [],
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      dataAll: {
        page: 1,
        limit: 10,
        total: 100,
        isUpper: '',
        dataList: [
          {
            id: '100',
            titel: '图片名称',
            position: '首页A区',
            industry: '金融，木材，保险',
            imgurl:
              'http://www.shiccs.net/pictures/index/topBanner2_20181126143140731.jpg',
            url:
              'http://www.shiccs.net/pictures/index/topBanner2_20181126143140731.jpg',
            upTime: '2018-08-08'
          }
        ]
      },
      newBanner: {
        title: '',
        imagesUrl: '',
        avatar: ''
      },
      upBanner: new FormData()
    }
  },
  computed: {},
  created() {},
  methods: {
    AddAdv() {
      this.showdialogForm = true
    },
    upimages(e) {
      var avatarImg = e.target.files[0]
      var avatarImgsize = avatarImg.size
      var avatarImgtype = avatarImg.type
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error('格式不正确')
        return false
      } else if (avatarImgsize > 5242880) {
        this.$message.error('图片太大了')
        return false
      } else {
        const _this = this
        if (!e || !window.FileReader) return
        const reader = new FileReader()
        reader.readAsDataURL(avatarImg)
        reader.onload = function(e) {
          _this.newBanner.avatar = e.target.result
        }
        this.upBanner.set('file', e.target.files[0])
      }
    },
    preservation() {
      this.showdialogForm = false
    },
    cancel() {
      this.showdialogForm = false
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
