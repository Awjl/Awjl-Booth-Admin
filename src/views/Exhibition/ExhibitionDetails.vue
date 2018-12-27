<template>
  <div class="app-container" style='width: 80%'>
    <el-button @click="quxiaoover" style="float:right">关闭</el-button>
    <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 80%; margin-left:50px;'>
      <el-row>
        <el-col :span="24">
          <el-form-item label="会展名称">
            <el-input placeholder="请输入会展名称"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展主题">
            <el-input placeholder="请输入主题"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展时间">
            <el-date-picker v-model="TimeData" :picker-options="pickerOptions" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
              </el-date-picker>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展参展商">
            <ul class="participateList">
              <li>
                <span>阿里巴巴</span>
                <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
              </li>
              <li>
                <span>阿里巴巴阿里巴巴阿里巴巴阿里巴巴阿里巴巴</span>
                <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
              </li>
            </ul> 
            <div style=""><el-button type="primary"  size="mini" icon="el-icon-plus">添加参展商</el-button></div> 
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展到访商">
             <ul class="participateList">
              <li>
                <span>阿里巴巴</span>
                <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
              </li>
              <li>
                <span>阿里巴巴阿里巴巴阿里巴巴阿里巴巴阿里巴巴</span>
                <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
              </li>
            </ul> 
            <div style=""><el-button type="primary"  size="mini" icon="el-icon-plus">添加到访商</el-button></div> 
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展地点">
            <el-input placeholder="请输入会展地点" ></el-input>
             <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item label="所属行业">
            <div>金融行业</div>
            <el-checkbox-group v-model="dataItem">
            <el-checkbox v-for="(item, index) in dataList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
            </el-checkbox-group>
             <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展简介">
            <el-input type="textarea" :rows="5" placeholder="请输入会展简介" ></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展宣传图">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展banner">
            <div class="upbtn">
              <label for="upTop">多张上传</label>
              <input type="file" id="upTop" value="图片上传预览" multiple/>
            </div>
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展场馆图">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展交通图">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="quxiaoover">取消</el-button>
      <el-button type="primary" @click="trueover">保存</el-button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      TimeData: [],
      dataList: [{ key: 1, name: '金融行业' }, { key: 2, name: '金融行业' }, { key: 3, name: '金融行业' }, { key: 4, name: '金融行业' }, { key: 5, name: '金融行业' }, { key: 6, name: '金融行业' }],
      dataItem: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    // if (this.$route.params.id !== 'null') {}
  },
  methods: {
    trueover() {
      console.log('保存')
    },
    quxiaoover() {
      this.$router.push({
        path: '/Exhibition/ExhibitionList'
      })
    }
  }
}
</script>
<style>
img {
  width: 100%;
}
.he20 {
  height: 20px;
}
.filter-container {
  width: 100%;
  min-height: 700px;
}
.participateList,.participateList li{
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
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
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
.delbox {
  position: relative;
}
.btndel {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #66b1ff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
.dialog-footer {
  padding: 0 90px;
}
</style>
