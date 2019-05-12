<template>
  <div class="app-container" style="width: 100%">
    <el-button @click="quxiaoover" style="float:right">关闭</el-button>
    <el-form
      ref="dataForm"
      label-position="center"
      label-width="100px"
      style="width: 80%; margin-left:50px;"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号">
            <el-input v-model="dataAll.email"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-model="dataAll.password"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司名称">
            <el-input v-model="dataAll.name"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="简称">
            <el-input v-model="dataAll.nameShort"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文全称">
            <el-input v-model="dataAll.nameEng"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业所在地">
            <el-input v-model="dataAll.address"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业规模">
            <!-- <el-input value="10-1000"></el-input> -->
            <el-select v-model="dataAll.member" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人">
            <el-input value="王先生" v-model="dataAll.linkman"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人职位">
            <el-select v-model="dataAll.position" placeholder="请选择">
              <el-option
                v-for="item in optionsTwo"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input value="13000000000" v-model="dataAll.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人邮件">
            <el-input value="132@qq.com" v-model="dataAll.linkmanEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一级行业">
            <el-select v-model="dataAll.oneIndustry" placeholder="请选择">
              <el-option
                :value="item.id"
                :label="item.industryName"
                v-for="(item, index) in industryData"
                :key="index"
              >{{item.industryName}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="二级行业">
            <el-select v-model="dataAll.twoIndustry" placeholder="请选择">
              <el-option
                :value="item.id"
                :label="item.industryName"
                v-for="(item, index) in items"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="行业关键词">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            </div>
            <div
              class="datatext"
              v-for="(item, index) in dataAll.keywords"
              :key="index"
            >{{item.key}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竞争对手">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            </div>
            <div
              class="datatext"
              v-for="(item, index) in dataAll.competitor"
              :key="index"
            >{{item.key}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主要供应商">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            </div>
            <div
              class="datatext"
              v-for="(item, index) in dataAll.supplier"
              :key="index"
            >{{item.key}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主要客户">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            </div>
            <div
              class="datatext"
              v-for="(item, index) in dataAll.customer"
              :key="index"
            >{{item.key}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="第三方服务">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            </div>
            <div
              class="datatext"
              v-for="(item, index) in dataAll.facilitator"
              :key="index"
            >{{item.key}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="感兴趣展会">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            </div>
            <div
              class="datatext"
              v-for="(item, index) in dataAll.exhibitions"
              :key="index"
            >{{item.name}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公司logo">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司简介">
            <el-input type="textarea" :rows="5" placeholder="请输入会展简介" v-model="dataAll.summary "></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司介绍页">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他信息">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input type="file" id="up" value="图片上传预览">
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
import {
  getCompanyInfo,
  addNewCompany,
  addUserInfo,
  getIndustry
} from "@/api/login";
export default {
  data() {
    return {
      loading: false,
      dataAll: {
        email: "",
        password: "",
        name: "",
        nameShort: "",
        engName: "",
        member: "",
        address: "",
        linkman: "",
        position: "",
        mobile: "",
        linkmanEmail: "",
        oneIndustry: "",
        twoIndustry: "",
        keywords: "",
        mainProcess: "",
        summary: "",
        supplier: "",
        competitor: "",
        customer: "",
        facilitator: "",
        exhibitions: "",
        params: "",
        logoPic: [],
        introductionPic: ""
      },
      industryData: [],
      items: [],
      options: [
        {
          value: 1,
          name: "1-20"
        },
        {
          value: 2,
          name: "21-100"
        },
        {
          value: 3,
          name: "101-1000"
        },
        {
          value: 4,
          name: "1000+"
        },
        {
          value: 5,
          name: "10000+"
        }
      ],
      optionsTwo: [
        {
          value: 1,
          name: "市场及销售"
        },
        {
          value: 2,
          name: "采购"
        },
        {
          value: 3,
          name: "管理"
        },
        {
          value: 4,
          name: "技术"
        },
        {
          value: 5,
          name: "生产及运营"
        },
        {
          value: 6,
          name: "其他"
        }
      ]
    };
  },
  created() {
    this._getIndustry();
  },
  methods: {
    //获取行业列表
    _getIndustry() {
      getIndustry().then(res => {
        if (res.code === 0) {
          this.industryData = res.data;
          this.items = this.industryData[0].secondIndustries;
          if (this.$route.params.id !== "null") {
            this._getCompanyInfo(this.$route.params.id, this.$route.params.id);
          }
        }
      });
    },
    // 获取用户详细信息
    _getCompanyInfo(userid, id) {
      getCompanyInfo(userid, id).then(res => {
        if (res.code === 0) {
          // linkmanEmail;
          this.dataAll = Object.assign(this.dataAll, res.data.user);
          // this.dataAll = res.data.user;
          this.dataAll.keywords = JSON.parse(this.dataAll.keywords);
          this.dataAll.mainProcess = JSON.parse(this.dataAll.mainProcess);
          this.dataAll.supplier = JSON.parse(this.dataAll.supplier);
          this.dataAll.competitor = JSON.parse(this.dataAll.competitor);
          this.dataAll.customer = JSON.parse(this.dataAll.customer);
          this.dataAll.facilitator = JSON.parse(this.dataAll.facilitator);
          this.dataAll.exhibitions = JSON.parse(
            this.dataAll.interestedExhibitions
          );

          this.dataAll.oneIndustry = res.data.user.oneIndustryid;
          this.dataAll.twoIndustry = res.data.user.twoIndustryid;
          this.dataAll.mobile = res.data.user.linkmanMobile;
          this.dataAll.position = res.data.user.linkmanPosition;
          // linkmanPosition
          console.log(this.dataAll);
        }
      });
    },
    trueover() {
      console.log("保存");
    },
    quxiaoover() {
      this.$router.push({
        path: "/Exhibition/ExhibitionList"
      });
    }
  }
};
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
.datatext {
  line-height: 20px;
  margin-bottom: 10px;
}
.participateList,
.participateList li {
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
