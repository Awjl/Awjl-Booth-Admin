<template>
  <div class="app-container" style='width: 100%'>
    <el-button @click="quxiaoover" style="float:right">关闭</el-button>
    <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 80%; margin-left:50px;'>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公司名称">
            <el-input  disabled="disabled" value="阿里巴巴公司"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文全称">
            <el-input  disabled="disabled" value="阿里巴巴公司"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业所在地">
            <el-input disabled="disabled" value="阿里巴巴公司"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业规模">
            <el-input disabled="disabled" value="10-1000"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人">
            <el-input disabled="disabled" value="王先生"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人职位">
            <el-input disabled="disabled" value="采购人员"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input disabled="disabled" value="13000000000"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人邮件">
            <el-input disabled="disabled" value="132@qq.com"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="行业类型">
            <div>金融行业</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行业关键词">
            <div>金融行业</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竞争对手">
            <div>京东商城</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主要供应商">
            <div>阿里巴巴</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主要客户">
            <div>阿里巴巴</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="第三方服务">
            <div>增值服务</div>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="参与展会">
            <div>中国第一届上海进口博览会</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司logo">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司简介">
            <el-input type="textarea" :rows="5" placeholder="请输入会展简介" ></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司介绍页">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他信息">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品手册">
             <el-table :data='dataAll.dataList' border style='width: 100%' v-loading='loading'>
          <el-table-column prop='titel' label='标题' align='center'></el-table-column>
          <el-table-column label='产品册图片' align='center'>
            <template slot-scope='scope'>
              <div class='box-img'>
                <img :src='scope.row.logo' alt align='center'>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop='num' label='产品册标签' align='center'></el-table-column>
          <el-table-column prop='industry' label='产品册介绍' align='center'></el-table-column>
          <el-table-column prop='Customer' label='上传时间' align='center'></el-table-column>
        </el-table>
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
      loading: false,
      dataAll: {
        dataList: []
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
