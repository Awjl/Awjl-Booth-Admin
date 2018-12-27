<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">新增权限</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="name" label="权限名称" align="center">
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
          </template> 
        </el-table-column> 
        <el-table-column prop="note" label="备注" align="center">
                <template slot-scope="scope">
                  <p v-if="scope.row.id != 1">
                    {{scope.row.note}}
                  </p>
                  <p v-else>
                    最高权限，不可更改
                  </p>
                </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.id != 1">
              <el-button @click="addRoles(scope.row.id)" type="primary" size="small" :disabled="!(adminData.indexOf('5') !== -1)" :title="(adminData.indexOf('5') !== -1) ? '' : '暂无权限'">修改</el-button>
              <el-button @click="del(scope.row.id)" type="danger" size="small" :disabled="!(adminData.indexOf('6') !== -1)" :title="(adminData.indexOf('6') !== -1) ? '' : '暂无权限'">删除</el-button>
            </p>
            <p v-else>
              不可操作
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="15%" style='width:90%;'>
        <el-form-item label="权限名称">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nameERR}}</span>
          <el-input placeholder="请输入权限名称" v-model="dataAll.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="请输入备注" v-model="dataAll.note"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox v-model="checkAll" >全选</el-checkbox>
          <div>网站管理</div>
          <el-checkbox-group v-model="homeData">
            <el-checkbox v-for="(item, index) in homeList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>会员管理</div>
          <el-checkbox-group v-model="userData">
            <el-checkbox v-for="(item, index) in userList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>商城管理</div>
          <el-checkbox-group v-model="shoppingData">
            <el-checkbox v-for="(item, index) in shoppingList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>积分商城管理</div>
          <el-checkbox-group v-model="integralData">
            <el-checkbox v-for="(item, index) in integralList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>订单管理</div>
          <el-checkbox-group v-model="orderData">
            <el-checkbox v-for="(item, index) in orderList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>优惠券管理</div>
          <el-checkbox-group v-model="discountData">
            <el-checkbox v-for="(item, index) in discountList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>停车管理</div>
          <el-checkbox-group v-model="parkData">
            <el-checkbox v-for="(item, index) in parkList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>服务管理</div>
          <el-checkbox-group v-model="serverData">
            <el-checkbox v-for="(item, index) in  serverList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>管理员管理</div>
          <el-checkbox-group v-model="adminDataItem">
            <el-checkbox v-for="(item, index) in adminList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>系统日志管理</div>
          <el-checkbox-group v-model="systemData">
            <el-checkbox v-for="(item, index) in systemList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueover">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      homeList: [{ key: 1, name: '新增Banner' }, { key: 2, name: '上下架Banner' }, { key: 3, name: '删除Banner' }, { key: 4, name: '更改首页文章内容' }, { key: 5, name: '新增大厅' }, { key: 6, name: '上下架大厅' }, { key: 7, name: '修改大厅' }, { key: 8, name: '删除大厅' }, { key: 9, name: '上下架首页推荐' }, { key: 10, name: '修改首页推荐' }, { key: 11, name: '删除首页推荐' }],
      homeData: [],
      userList: [{ key: 1, name: '导出用户' }],
      userData: [],
      shoppingList: [{ key: 1, name: '新增大厅商品' }, { key: 2, name: '修改大厅商品' }, { key: 3, name: '上下架大厅商品' }, { key: 4, name: '删除大厅商品' }, { key: 5, name: '新增餐券商品' }, { key: 6, name: '修改顶部热推' }, { key: 7, name: '核销代金券' }, { key: 8, name: '推荐至首页' }, { key: 9, name: '设置热推商品' }, { key: 10, name: '修改商品' }, { key: 11, name: '上下架商品' }, { key: 12, name: '删除商品' }],
      shoppingData: [],
      integralList: [{ key: 1, name: '新增积分商品' }, { key: 2, name: '修改积分商品' }, { key: 3, name: '上下架积分商品' }, { key: 4, name: '删除' }, { key: 5, name: '修改积分规则' }, { key: 6, name: '上下架积分规则' }],
      integralData: [],
      orderList: [{ key: 1, name: '导出商品订单' }, { key: 2, name: '导出积分商品订单' }, { key: 3, name: '发货' }],
      orderData: [],
      discountList: [{ key: 1, name: '新增优惠券' }, { key: 2, name: '上下架优惠券' }, { key: 3, name: '管理优惠券' }, { key: 4, name: '删除优惠券' }, { key: 5, name: '发放优惠券' }],
      discountData: [],
      parkList: [{ key: 1, name: '导出停车列表' }],
      parkData: [],
      serverList: [{ key: 1, name: '添加反馈' }, { key: 2, name: '联系客户' }, { key: 3, name: '添加问题' }, { key: 4, name: '修改热线' }, { key: 5, name: '修改问题' }, { key: 6, name: '上下架问题' }, { key: 7, name: '删除问题' }],
      serverData: [],
      adminList: [{ key: 1, name: '添加管理员' }, { key: 2, name: '修改管理员' }, { key: 3, name: '删除管理员' }, { key: 4, name: '新增权限' }, { key: 5, name: '修改权限' }, { key: 6, name: '删除权限' }],
      adminDataItem: [],
      systemList: [{ key: 1, name: '删除日志' }],
      systemData: [],
      loading: false,
      total: 1,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      data: {
        pageNum: null,
        pageSize: null
      },
      title: '新增权限管理',
      dataAll: {
        name: '',
        homeData: '',
        userData: '',
        shoppingData: '',
        integralData: '',
        orderData: '',
        discountData: '',
        serverData: '',
        adminData: '',
        systemData: '',
        parkData: '',
        note: '',
        id: ''
      },
      checkAll: false,
      isIndeterminate: true,
      nameERR: ''
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getRoles()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getRoles()
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
