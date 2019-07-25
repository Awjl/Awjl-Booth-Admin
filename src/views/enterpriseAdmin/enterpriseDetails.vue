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
          <el-form-item label="邮箱">
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
            <el-input v-model="dataAll.name" v-on:input="inputFunc()"></el-input>
            <!-- <span ></span> -->
            <div
              style="position: absolute;
              top:40px;
              left:0px;
              background:#fff;
              z-index:999;
              width:100%;
              padding: 0 10px;
              max-height: 274px;
              overflow-y: auto;
              box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
              "
            >
              <div
                class
                v-for="(item, index) in serachList"
                :key="index"
                @click.stop="tureBoxOne(item)"
              >{{item.screenName}}</div>
            </div>
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
            <el-select v-model="dataAll.oneIndustry" placeholder="请选择" @change="currentSel">
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
              <el-input placeholder="请输入内容" size="mini" v-model="add1"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(1)"></el-button>
            </div>
            <div class="datatext" v-for="(item, index) in dataAll.keywords" :key="index">
              {{item.key}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeadd(1, index)"
              ></el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竞争对手">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini" v-model="add2"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(2)"></el-button>
            </div>
            <div class="datatext" v-for="(item, index) in dataAll.competitor" :key="index">
              {{item.key}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeadd(2,index)"
              ></el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主要供应商">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini" v-model="add3"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(3)"></el-button>
            </div>
            <div class="datatext" v-for="(item, index) in dataAll.supplier" :key="index">
              {{item.key}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeadd(3, index)"
              ></el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主要客户">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini" v-model="add4"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(4)"></el-button>
            </div>
            <div class="datatext" v-for="(item, index) in dataAll.customer" :key="index">
              {{item.key}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeadd(4, index)"
              ></el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="第三方服务">
            <div style="display:flex;  justify-content: space-between;align-items: center">
              <el-input placeholder="请输入内容" size="mini" v-model="add5"></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(5)"></el-button>
            </div>
            <div class="datatext" v-for="(item, index) in dataAll.facilitator" :key="index">
              {{item.key}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeadd(5, index)"
              ></el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="感兴趣展会">
            <div
              style="display:flex;position: relative; justify-content: space-between;align-items: center"
            >
              <el-input
                placeholder="请输入内容"
                size="mini"
                v-model="add6"
                v-on:input="inputFuncServer()"
              ></el-input>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(6)"></el-button>
              <div class="ExhibitionallLeftBox">
                <div
                  class="ExhibitionallLeftBoxList"
                  v-for="(item, index) in searchExh"
                  :key="index"
                  @click="trueExhibitionall(item)"
                >{{item.name}}</div>
              </div>
            </div>
            <div class="datatext" v-for="(item, index) in dataAll.exhibitions" :key="index">
              {{item.name}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeadd(6, index)"
              ></el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公司logo">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="up1">预览图片</label>
              <input type="file" id="up1" value="图片上传预览" @change="uplogo" />
            </div>
            <div v-if="filebaseurl" style="width: 300px;">
              <img :src="filebaseurl" alt />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司简介">
            <el-input type="textarea" :rows="5" placeholder="请输入公司简介" v-model="dataAll.summary"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="showman">
          <el-form-item label="其他信息">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="uplist">预览图片</label>
              <input type="file" id="uplist" value="图片上传预览" @change="upImg" />
            </div>
            <div class="pictureList">
              <div v-for="(item, index) in dataimgList" :key="index">
                <div
                  class="UpImgButton"
                  @click="removeButton(item.picture.ossId,item.picture.id, index)"
                >删除</div>
                <img :src="item.picture.url" alt style="width: 80px;height:80px;" />
                <div style="width: 80px;">
                  <input
                    type="text"
                    placeholder="请输入图片说明"
                    v-model="item.picture.description"
                    style="width: 80px;"
                    @change="setData(item)"
                  />
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="!showman">
          <el-form-item label="其他信息">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="uplisttow">预览图片</label>
              <input type="file" id="uplisttow" value="图片上传预览" @change="upImg" />
            </div>
            <div class="pictureList">
              <div v-for="(item, index) in dataAll.params" :key="index">
                <div
                  class="UpImgButton"
                  @click="removeButton(item.picture.ossId, item.picture.id,index)"
                >删除</div>
                <img :src="item.url" alt style="width: 80px;height:80px;" />
                <div style="width: 80px;">
                  <input
                    type="text"
                    placeholder="请输入图片说明"
                    v-model="item.description"
                    style="width: 80px;"
                  />
                </div>
              </div>
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
  getIndustry,
  upload,
  updatePicture,
  savePicture,
  searchExhibition,
  deletePicture,
  searchCompany
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
        keywords: [],
        mainProcess: [],
        summary: "",
        supplier: [],
        competitor: [],
        customer: [],
        facilitator: [],
        exhibitions: [],
        params: [],
        logoPic: [],
        introductionPic: ""
      },
      dataimgList: [],
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
      ],
      filebase: "",
      filebaseurl: "",
      add1: "",
      add2: "",
      add3: "",
      add4: "",
      add5: "",
      add6: "",
      add6ID: "",
      showman: false,
      imgType: {
        type: "image/jpeg, image/png, image/jpg"
      },
      serachList: [],
      searchExh: [],
      Exhibitionindex: 0,
      searchcenter: "",
      timer2: ""
    };
  },
  created() {
    if (this.$route.params.id == "null") {
      this.showman = false;
    } else {
      this.showman = true;
    }
    this._getIndustry();
  },
  methods: {
    currentSel() {
      for (let i = 0; i < this.industryData.length; i++) {
        if (this.industryData[i].id === this.dataAll.oneIndustry) {
          this.items = this.industryData[i].secondIndustries;
          this.dataAll.twoIndustry = this.industryData[
            i
          ].secondIndustries[0].id;
        }
      }
    },
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
    _searchExhibition(name) {
      searchExhibition(name).then(res => {
        if (res.code === 0) {
          this.searchExh = res.data;
        }
      });
    },
    setTime2() {
      this.timer2 = setTimeout(() => {
        this._searchExhibition(this.searchcenter);
      }, 1000);
    },
    inputFuncServer() {
      clearInterval(this.timer2);
      this.searchExh = [];
      this.searchcenter = this.add6;
      this.setTime2();
      // this._searchExhibition(this.searchcenter);
    },
    trueExhibitionall(item) {
      this.searchExh = [];
      this.add6 = item.name;
      this.add6ID = item.id;
    },
    // 删除
    removeButton(ossId, id, index) {
      deletePicture(ossId, id).then(res => {
        if (res.data.code === 0) {
          this.dataimgList.splice(index, 1);
        }
      });
    },
    // 获取用户详细信息
    _getCompanyInfo(userid, id) {
      getCompanyInfo(userid, id).then(res => {
        if (res.code === 0) {
          // linkmanEmail;
          this.dataimgList = res.data.pictures;
          this.dataAll = Object.assign(this.dataAll, res.data.user);
          // this.dataAll = res.data.user;
          this.filebaseurl = this.dataAll.logoUrl;

          this.dataAll.keywords = this.dataAll.keywords
            ? JSON.parse(this.dataAll.keywords)
            : [];
          this.dataAll.mainProcess = this.dataAll.mainProcess
            ? JSON.parse(this.dataAll.mainProcess)
            : [];

          this.dataAll.supplier = this.dataAll.supplier
            ? JSON.parse(this.dataAll.supplier)
            : [];
          this.dataAll.competitor = this.dataAll.competitor
            ? JSON.parse(this.dataAll.competitor)
            : [];
          this.dataAll.customer = this.dataAll.customer
            ? JSON.parse(this.dataAll.customer)
            : [];
          this.dataAll.facilitator = this.dataAll.facilitator
            ? JSON.parse(this.dataAll.facilitator)
            : [];
          this.dataAll.exhibitions = JSON.parse(
            this.dataAll.interestedExhibitions
          );
          this.dataAll.oneIndustry = res.data.user.oneIndustryid;
          this.dataAll.twoIndustry = res.data.user.twoIndustryid;
          this.dataAll.mobile = res.data.user.linkmanMobile;
          this.dataAll.position = res.data.user.linkmanPosition;
          for (let i = 0; i < this.industryData.length; i++) {
            if (this.industryData[i].id === this.dataAll.oneIndustry) {
              this.items = this.industryData[i].secondIndustries;
            }
          }
          // this.items = this.industryData[
          //   this.dataAll.oneIndustry - 1
          // ].secondIndustries;
        }
      });
    },
    // 修改
    addUserInfo() {
      let formData = new FormData();

      formData.append("id", this.$route.params.id);
      formData.append("name", this.dataAll.name);
      formData.append("nameShort", this.dataAll.nameShort);
      formData.append("engName", this.dataAll.nameEng);
      formData.append("member", this.dataAll.member);
      formData.append("address", this.dataAll.address);
      formData.append("linkman", this.dataAll.linkman);
      formData.append("position", this.dataAll.position);
      formData.append("mobile", this.dataAll.mobile);
      formData.append("linkmanEmail", this.dataAll.linkmanEmail);
      formData.append("oneIndustry", this.dataAll.oneIndustry);
      formData.append("twoIndustry", this.dataAll.twoIndustry);
      formData.append("competitor", JSON.stringify(this.dataAll.competitor));
      formData.append("keywords", JSON.stringify(this.dataAll.keywords));
      formData.append("mainProcess", JSON.stringify(this.dataAll.mainProcess));
      formData.append("facilitator", JSON.stringify(this.dataAll.facilitator));
      formData.append("summary", this.dataAll.summary);
      formData.append("exhibitions", JSON.stringify(this.dataAll.exhibitions));
      formData.append("customer", JSON.stringify(this.dataAll.customer));
      formData.append("logoPic", this.filebase);
      formData.append("supplier", JSON.stringify(this.dataAll.supplier));
      addUserInfo(formData).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$router.push({
            path: "/enterpriseAdmin"
          });
        } else if (res.data.code === 500511) {
          this.$message({
            type: "error",
            message:
              "不好意思,该企业中文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称"
          });
        } else if (res.data.code === 500512) {
          this.$message({
            type: "error",
            message:
              "不好意思,该企业英文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称"
          });
        }
      });
    },
    // 新增
    addNewCompany() {
      let formData = new FormData();
      formData.append("params", JSON.stringify(this.dataAll.params));
      formData.append("email ", this.dataAll.email);
      formData.append("password ", this.dataAll.password);
      formData.append("name", this.dataAll.name);
      formData.append("nameShort", this.dataAll.nameShort);
      formData.append("engName", this.dataAll.nameEng);
      formData.append("member", this.dataAll.member);
      formData.append("address ", this.dataAll.address);
      formData.append("linkman", this.dataAll.linkman);
      formData.append("oneIndustry", this.dataAll.oneIndustry);
      formData.append("twoIndustry", this.dataAll.twoIndustry);
      formData.append("linkmanEmail", this.dataAll.linkmanEmail);
      formData.append("position", this.dataAll.position);
      formData.append("mobile", this.dataAll.mobile);
      formData.append("competitor", JSON.stringify(this.dataAll.competitor));
      formData.append("keywords", JSON.stringify(this.dataAll.keywords));
      formData.append("mainProcess", JSON.stringify(this.dataAll.mainProcess));
      formData.append("facilitator", JSON.stringify(this.dataAll.facilitator));
      formData.append("summary", this.dataAll.summary);
      formData.append("exhibitions", JSON.stringify(this.dataAll.exhibitions));
      formData.append("customer", JSON.stringify(this.dataAll.customer));
      formData.append("logoPic", this.filebase);
      formData.append("supplier", JSON.stringify(this.dataAll.supplier));
      addNewCompany(formData).then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.$router.push({
            path: "/enterpriseAdmin"
          });
        } else if (res.data.code === 500503) {
          this.$message({
            type: "error",
            message: "用户已存在"
          });
        } else if (res.data.code === 500511) {
          this.$message({
            type: "error",
            message:
              "不好意思,该企业中文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称"
          });
        } else if (res.data.code === 500512) {
          this.$message({
            type: "error",
            message:
              "不好意思,该企业英文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称"
          });
        } else {
          this.$message({
            type: "error",
            message: "信息填写错误"
          });
        }
      });
    },
    setData(item) {
      let formData = new FormData();
      console.log(item);
      formData.append("ossId", item.picture.ossId);
      formData.append("description", item.picture.description);
      formData.append("url", item.picture.url);
      formData.append("userId", item.picture.userId);
      formData.append("id", item.picture.id);
      updatePicture(formData).then(res => {
        if (res.data.code === 0) {
        }
      });
    },
    setTime() {
      this.timer = setTimeout(() => {
        this._searchCompany();
      }, 1000);
    },
    inputFunc() {
      // 搜索 1
      clearInterval(this.timer);
      this.setTime();
    },
    tureBoxOne(item) {
      if (item) {
        this.dataAll.name = item.screenName;
        this.dataAll.address = item.address;
      }
      this.serachList = [];
    },
    _searchCompany() {
      searchCompany(this.dataAll.name).then(res => {
        console.log(res);
        if (res.retcode === "000000") {
          this.serachList = res.data;
          console.log(this.serachList);
        }
      });
    },
    upImg(e) {
      let formData = new FormData();
      let file = e.target.files[0];
      formData.append("file", file);
      upload(formData).then(res => {
        var _this = this;
        if (res.data.code === 0) {
          if (this.$route.params.id !== "null") {
            let formDataTwo = new FormData();
            formDataTwo.append("ossId", res.data.data);
            formDataTwo.append("description", "");
            formDataTwo.append(
              "url",
              `http://booth1.oss-cn-shanghai.aliyuncs.com/${res.data.data}?x-oss-process=image/format,png`
            );
            formDataTwo.append("userId", this.$route.params.id);
            savePicture(formDataTwo).then(res => {
              if (res.data.code === 0) {
                _this.dataimgList.push({
                  isCollected: null,
                  picture: {
                    createDate: "",
                    ossId: res.data.data.ossId,
                    url: `http://booth1.oss-cn-shanghai.aliyuncs.com/${res.data.data.ossId}?x-oss-process=image/format,png`,
                    id: "",
                    userId: this.$route.params.id,
                    description: ""
                  }
                });
              }
            });
          } else {
            this.dataAll.params.push({
              ossId: res.data.data,
              url: `http://booth1.oss-cn-shanghai.aliyuncs.com/${res.data.data}?x-oss-process=image/format,png`,
              description: ""
            });
            console.log(this.dataAll.params);
          }
        }
      });
    },
    uplogo(e) {
      let avatarImg = e.target.files[0];
      let avatarImgtype = avatarImg.type;
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error("格式不正确");
        return false;
      } else {
        const _this = this;
        const reader = new FileReader();
        reader.readAsDataURL(avatarImg);
        reader.onload = function(e) {
          _this.filebaseurl = e.target.result;
        };
        this.filebase = avatarImg;
      }
    },
    add(num) {
      switch (num) {
        case 1:
          if (this.add1) {
            let obj = { key: this.add1 };
            this.dataAll.keywords.push(obj);
            this.add1 = "";
          }
          break;
        case 2:
          if (this.add2) {
            let obj = { key: this.add2 };
            this.dataAll.competitor.push(obj);
            this.add2 = "";
          }
          break;
        case 3:
          if (this.add3) {
            let obj = { key: this.add3 };
            this.dataAll.supplier.push(obj);
            this.add3 = "";
          }
          break;
        case 4:
          if (this.add4) {
            let obj = { key: this.add4 };
            this.dataAll.customer.push(obj);
            this.add4 = "";
          }
          break;
        case 5:
          if (this.add5) {
            let obj = { key: this.add5 };
            this.dataAll.facilitator.push(obj);
            this.add5 = "";
          }
          break;
        case 6:
          this.dataAll.exhibitions.push({
            name: this.add6,
            state: 1,
            numID: this.add6ID,
            id: 0
          });
          break;
        default:
          break;
      }
    },
    removeadd(num, index) {
      // console.log(num);
      switch (num) {
        case 1:
          this.dataAll.keywords.splice(index, 1);
          break;
        case 2:
          this.dataAll.competitor.splice(index, 1);
          break;
        case 3:
          this.dataAll.supplier.splice(index, 1);
          break;
        case 4:
          this.dataAll.customer.splice(index, 1);
          break;
        case 5:
          this.dataAll.facilitator.splice(index, 1);
          break;
        case 6:
          this.dataAll.exhibitions.splice(index, 1);
          break;
        default:
          break;
      }
    },
    trueover() {
      console.log("保存");
      if (this.showman) {
        this.addUserInfo();
      } else {
        this.addNewCompany();
      }
    },
    quxiaoover() {
      this.$router.push({
        path: "/enterpriseAdmin"
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
  width: 100%;
  line-height: 30px;
  padding-right: 39px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  position: relative;
}
.datatext .el-button {
  position: absolute;
  padding: 7px 10px;
  right: 0px;
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
.ExhibitionallLeftBox {
  position: absolute;
  width: 100%;
  background: #fff;
  max-height: 150px;
  bottom: 36px;
  overflow: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ExhibitionallLeftBoxList {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  cursor: pointer;
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
  /* box-shadow:  */
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
.pictureList {
  max-width: 100%;
}
.pictureList .UpImgButton {
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  background: #2c73a1;
  color: #fff;
  border-radius: 4px;
}
.pictureList > div {
  float: left;
  margin: 0 20px;
}
</style>
