<template>
  <div class="app-container" style="width: 80%">
    <el-button @click="quxiaoover" style="float:right">关闭</el-button>
    <el-form
      ref="dataForm"
      label-position="center"
      label-width="100px"
      style="width: 80%; margin-left:50px;"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="会展名称">
            <el-input placeholder="请输入会展名称" v-model="upDataList.name"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展英文名称">
            <el-input placeholder="请输入会展英文名称" v-model="upDataList.nameEng"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否上架">
            <el-select style="width: 150px" class="filter-item" v-model="upDataList .isUpper">
              <el-option label="上架" :value="1">上架</el-option>
              <el-option label="下架" :value="2">下架</el-option>
            </el-select>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展时间(中)">
            <el-input placeholder="2019年01月01日-02月01日" v-model="upDataList.date"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会展时间(英)">
            <el-input placeholder="January 01-02 01, 2019" v-model="upDataList.dateEng"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="会展主题">
            <el-input placeholder="请输入主题" v-model="upDataList.title"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="所属行业">
            <el-select
              style="width: 150px"
              class="filter-item"
              v-model="upDataList.oneIndustry"
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
              v-model="upDataList.twoIndustry"
              placeholder="次级行业"
              @change="currentSelTwo"
            >
              <el-option
                :value="item.id"
                :label="item.industryName"
                v-for="(item, index) in dataItem"
                :key="index"
              >{{item.industryName}}</el-option>
            </el-select>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展地点">
            <el-input placeholder="请输入会展地点" v-model="upDataList.location"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展简介">
            <el-input type="textarea" :rows="5" placeholder="请输入会展简介" v-model="upDataList.summary"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展宣传图">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="upone">预览图片</label>
              <input type="file" @change="upimagesOne" id="upone" value="图片上传预览">
            </div>
            <div v-if="upDataList.summaryPicUrl">
              <img :src="upDataList.summaryPicUrl" alt>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展banner">
            <div class="upbtn">
              <label for="upTwo">多张上传</label>
              <input type="file" @change="upimagesTwo" id="upTwo" value="图片上传预览" multiple>
            </div>
            <el-row v-if="upDataList.bannerPicsUrl.length > 0">
              <el-col :span="8" v-for="(item, index) in upDataList.bannerPicsUrl" :key="index">
                <img :src="item" alt>
              </el-col>
            </el-row>
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展场馆图">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="upThree">预览图片</label>
              <input type="file" @change="upimagesThree" id="upThree" value="图片上传预览">
            </div>
            <div v-if="upDataList.mapPicUrl">
              <img :src="upDataList.mapPicUrl" alt>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会展交通图">
            <span style="position: absolute;top:20px;left:0px;color:red"></span>
            <div class="upbtn">
              <label for="upfore">预览图片</label>
              <input type="file" @change="upimagesfour" id="upfore" value="图片上传预览">
            </div>
            <div v-if="upDataList.trafficPicUrl">
              <img :src="upDataList.trafficPicUrl" alt>
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
  getExhibitionById,
  addExhibition,
  editExhibition,
  getIndustry
} from "@/api/login";

export default {
  data() {
    return {
      imgType: {
        type: "image/jpeg, image/png, image/jpg"
      },
      TimeData: [],
      dataList: [],
      dataItem: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      upData: new FormData(),
      upDataList: {
        id: "",
        name: "",
        nameEng: "",
        title: "",
        oneIndustry: "",
        twoIndustry: "",
        location: "",
        summary: "",
        date: "",
        dateEng: "",
        isUpper: 1,
        bannerPics: [],
        bannerPicsUrl: [],
        summaryPic: "",
        summaryPicUrl: "",
        mapPic: "",
        mapPicUrl: "",
        trafficPic: "",
        trafficPicUrl: ""
      }
    };
  },
  created() {
    this._getIndustry();
  },
  methods: {
    _getIndustry(id) {
      getIndustry(id).then(res => {
        this.dataList = res.data;
        this.dataItem = this.dataList[0].secondIndustries;
        if (this.$route.params.id !== "null") {
          this._getExhibitionById();
        }
      });
    },
    _editExhibition() {
      editExhibition(this.upData).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$router.push({
            path: "/Exhibition/ExhibitionList"
          });
        }
      });
    },
    _addExhibition() {
      addExhibition(this.upData).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.push({
            path: "/Exhibition/ExhibitionList"
          });
        }
      });
    },
    _getExhibitionById() {
      getExhibitionById(this.$route.params.id).then(res => {
        if (res.code === 0) {
          this.upDataList.id = res.data.id;
          this.upDataList.name = res.data.name;
          this.upDataList.nameEng = res.data.nameEng;
          this.upDataList.title = res.data.title;
          this.upDataList.location = res.data.location;
          this.upDataList.oneIndustry = res.data.oneIndustryid;
          this.dataItem = this.dataList[
            this.upDataList.oneIndustry - 1
          ].secondIndustries;
          this.upDataList.twoIndustry = res.data.twoIndustryid;
          this.upDataList.summary = res.data.summary;
          this.upDataList.date = res.data.date;
          this.upDataList.dateEng = res.data.dateEng;
          this.upDataList.isUpper = res.data.isUpper;
          this.upDataList.bannerPicsUrl = res.data.bannerUrl.split(",");
          this.upDataList.summaryPicUrl = res.data.summaryPicture;
          this.upDataList.mapPicUrl = res.data.mapUrl;
          this.upDataList.trafficPicUrl = res.data.trafficUrl;
        }
      });
    },
    currentSel() {
      this.upDataList.twoIndustry = "";
      // this.upDataList.industryName = this.dataList[
      //   this.upDataList.oneIndustry - 1
      // ].industryName;
      this.dataItem = this.dataList[
        this.upDataList.oneIndustry - 1
      ].secondIndustries;
    },
    currentSelTwo(vId) {
      let obj = {};
      obj = this.dataItem.find(item => {
        return item.id === vId;
      });
      // this.upDataList.industryName = obj.industryName;
    },
    trueover() {
      console.log("保存");
      this.upData.append("name", this.upDataList.name);
      this.upData.append("nameEng", this.upDataList.nameEng);
      this.upData.append("title", this.upDataList.title);
      this.upData.append("oneIndustry", this.upDataList.oneIndustry);
      if (this.upDataList.twoIndustry) {
        this.upData.append("twoIndustry", this.upDataList.twoIndustry);
      } else {
        this.upData.append("twoIndustry", 0);
      }
      this.upData.append("location", this.upDataList.location);
      this.upData.append("summary", this.upDataList.summary);
      this.upData.append("date", this.upDataList.date);
      this.upData.append("dateEng", this.upDataList.dateEng);
      this.upData.append("isUpper", this.upDataList.isUpper);
      for (let i = 0; i <= this.upDataList.bannerPics.length; i++) {
        this.upData.append("bannerPics", this.upDataList.bannerPics[i]);
      }
      this.upData.append("summaryPic", this.upDataList.summaryPic);
      this.upData.append("mapPic", this.upDataList.mapPic);
      this.upData.append("trafficPic", this.upDataList.trafficPic);
      if (this.$route.params.id !== "null") {
        this.upData.append("id", this.upDataList.id);
        this._editExhibition();
      } else {
        this._addExhibition();
      }
    },
    quxiaoover() {
      this.$router.push({
        path: "/Exhibition/ExhibitionList"
      });
    },
    upimagesOne(e) {
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
          _this.upDataList.summaryPicUrl = e.target.result;
          console.log(_this.upDataList);
        };
        this.upDataList.summaryPic = avatarImg;
      }
    },
    upimagesTwo(e) {
      let avatarImg = e.target.files;
      for (var i = 0; i < avatarImg.length; i++) {
        let Img = e.target.files[i];
        let avatarImgtype = Img.type;
        if (this.imgType.type.indexOf(avatarImgtype) === -1) {
          this.$message.error("格式不正确");
          return false;
        } else {
          const _this = this;
          if (!e || !window.FileReader) return;
          const reader = new FileReader();
          reader.readAsDataURL(Img);
          reader.onload = function(e) {
            _this.upDataList.bannerPicsUrl.push(e.target.result);
          };
          this.upDataList.bannerPics.push(Img);
        }
      }
    },
    upimagesThree(e) {
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
          _this.upDataList.mapPicUrl = e.target.result;
          console.log(_this.upDataList);
        };
        this.upDataList.mapPic = avatarImg;
      }
    },
    upimagesfour(e) {
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
          _this.upDataList.trafficPicUrl = e.target.result;
          console.log(_this.upDataList);
        };
        this.upDataList.trafficPic = avatarImg;
      }
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
