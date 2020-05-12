<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 我的订单</span>
      <el-breadcrumb separator="/" style="font-size: 24px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          进货喽
        </el-breadcrumb-item>
      </el-breadcrumb>
         <el-table
          :data="myOrderList"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序列"
            width="50">
          </el-table-column>
          <el-table-column
            prop="_id"
            label="唯一编码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="o_servername"
            label="配送专员"
            width="100">
          </el-table-column>
          <el-table-column
            prop="o_jointime"
            label="创建时间"
            width="200">
          </el-table-column>
          <el-table-column
            label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.o_state"
                disabled
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="top" inline class="demo-table-expand">
                <el-form-item label="配送专员信息:">
                  <span>{{ props.row.o_server.u_name }}</span>---
                  <span>{{ props.row.o_server.u_phone }}</span>---
                  <span>{{ props.row.o_server.u_area }}</span>---
                  <span>{{ props.row.o_server.u_town }}</span>
                </el-form-item>
                <el-form-item label="订单详情:">
                  <span v-for="item in props.row.o_order.orderList" :key="item.g_name">
                  {{ item.g_name }}--
                  {{ item.buyNumber }}--
                  {{ item.g_unit }}--
                  共计{{ item.g_value }}
                  元<br>
                  </span>
                </el-form-item>
                <el-form-item label="总计:">
                  <span>{{ props.row.o_order.total }}元</span>
                </el-form-item>
                <el-form-item label="我的留言:">
                  <span>{{ props.row.o_order.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="下单">
<!--      g_state: true
      g_img: "dongdoufu.jpg"
      _id: "5e98309622c4e7420c7d9cc7"
      g_class: "豆制品"
      g_name: "冻豆腐"
      g_price: 5
      g_unit: "盒"
      g_number: 50 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="分类">
          <el-input v-model="goodClass" placeholder="分类"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="goodName" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
     </el-form>
     <el-collapse>
        <el-collapse-item title="货物列表" name="1">
            <el-table
              :data="goodList"
              style="width: 100%">
              <el-table-column
                prop="g_name"
                label="名称"
                width="150">
              </el-table-column>
              <el-table-column
                label="图片"
                width="150">
                <template slot-scope='scope'>
                  <el-image
                        style="width: 100px; height: 100px"
                        :src="'http://127.0.0.1:1314/'+scope.row.g_img">
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="g_price"
                label="价格/元"
                width="150">
              </el-table-column>
              <el-table-column
                prop="g_unit"
                label="单位"
                width="150">
              </el-table-column>
              <el-table-column
                prop="g_number"
                label="存量"
                width="150">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="状态"
                width="100">
                <template slot-scope='scope'>
                  <el-switch
                    v-model="scope.row.g_state"
                    disabled
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
<!--                  <el-button @click="handleClick(scope.row)" type="text" size="small">添加到包裹</el-button> -->
                  <el-button :disabled="!scope.row.g_state" @click="addGoodToPackage(scope.row)" icon="el-icon-circle-plus-outline" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-collapse-item>
        <el-collapse-item title="订单结算" name="2">
          <el-table
              :data="addOrder"
              style="width: 100%">
              <el-table-column
                type="index"
                label="顺序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="g_name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="g_price"
                label="价格/元"
                width="120">
              </el-table-column>
              <el-table-column
                prop="g_unit"
                label="单位"
                width="120">
              </el-table-column>
              <el-table-column
                label="金额"
                width="120">
                <template slot-scope="scope">
                  {{scope.row.g_value}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                fixed="right"
                width="200">
                <template slot-scope="scope">
                  <el-input type="number" :min="1" :max="scope.row.g_number" v-model="scope.row.buyNumber" @change="putNumber(scope.row)"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="280">
                <template slot-scope="scope">
                  <el-button type="danger" @click="deleteGood(scope.row)" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="success" @click="openAddOderDialogVisible">生成订单</el-button>
            <el-button type="info" @click="addOrder=[]">清空</el-button>
        </el-collapse-item>
        <el-dialog
          title="请检查单据"
          :visible.sync="addOderDialogVisible"
          width="30%">
           <el-table
            :data="addOrder"
            stripe
            style="width: 100%; margin: 0px auto;">
            <el-table-column
              prop="g_name"
              label="名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="buyNumber"
              label="数量"
              width="80">
            </el-table-column>
            <el-table-column
              prop="g_value"
              width="80"
              label="金额">
            </el-table-column>
          </el-table>
          <el-button type="text">总计为：{{total}}</el-button>
          <el-input
            type="textarea"
            label="备注"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addOderDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMyOrder">确 定</el-button>
          </span>
        </el-dialog>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      goodList: [],
      goodClass: '',
      goodName: '',
      addOrder: [],
      addOderDialogVisible: false,
      textarea: '',
      total: '',
      myOrder: {},
      myPhone: '',
      myArea: '',
      sendOrder: {
        o_order: {}
      },
      myOrderList: []
    }
  },
  created () {
    this.getGoodList()
    this.getO_user()
    this.getMyOrser()
  },
  methods: {
    async getMyOrser () {
      this.myPhone = window.sessionStorage.getItem('phone')
      const { data: res } = await this.$http.get(`user/getalluser?u_phone=${this.myPhone}`)
      // console.log(this.sendOrder.o_user)
      const { data: resOrder } = await this.$http.get(`order/getorder/?o_username=${res.result[0].u_name}`)
      console.log(resOrder)
      this.myOrderList = resOrder.result
    },
    async getGoodList () {
      // console.log(this.goodClass)
      const { data: res } = await this.$http.get(`/good/getgood?g_class=${this.goodClass}&g_name=${this.goodName}&`)
      // console.log(res)
      this.goodList = res.result
    },
    addGoodToPackage (Good) {
      // console.log(Good)
      if (this.addOrder.indexOf(Good) === -1) {
        const addGood = Good
        this.addOrder.push(addGood)
      } else {
        this.$message.error('请勿重复添加')
      }
      // console.log(this.addOrder)
    },
    deleteGood (Row) {
      this.addOrder.splice(this.addOrder.indexOf(Row), 1)
    },
    putNumber (Row) {
      Row.g_value = Row.g_price * Row.buyNumber
    },
    onSubmit () {
      // console.log('我点击了查询按钮')
      this.getGoodList()
    },
    openAddOderDialogVisible () {
      this.total = 0
      for (var item in this.addOrder) {
        this.total += parseInt(this.addOrder[item].g_value)
      }
      this.addOderDialogVisible = true
    },
    // 确认添加表单
    async addMyOrder () {
      // 拼接对象,将备注,具体金额,详细集成一个对象
      this.myOrder.orderList = this.addOrder
      this.myOrder.total = this.total
      this.myOrder.remark = this.textarea
      // 检查是否拼接完美
      console.log(this.myOrder)
      // 将拼装好的订单赋值给发送订单
      this.sendOrder.o_order = this.myOrder
      // 将给订单发送数据库
      // 获得当前用户的_id
      this.getO_user()
      // 根据当前用户id返回的住址，匹配住址相同且身份为配送专员的用户，获取配送专员的_id
      // this.getO_server()
      // 整合数据,将该订单记录到数据库中去
      console.log(this.sendOrder)
      const { data: res } = await this.$http.post('order/addorder', this.sendOrder)
      // console.log(res)
      if (res.status === 200) {
        this.$message.success('添加订单成功')
      } else {
        this.$message.error('添加订单失败')
      }
      // 将返回的数据,添加给双方
      // const resOrder = res.result
      // console.log(resOrder)
      this.getMyOrser()
      // 最后的结尾要做的事情
      this.myOrder = {}
      this.addOrder = []
      this.addOderDialogVisible = false
    },
    // 获取当前用户的ID
    async getO_user () {
      this.myPhone = window.sessionStorage.getItem('phone')
      const { data: res } = await this.$http.get(`user/getalluser?u_phone=${this.myPhone}`)
      // 返回地址
      // console.log(res.result[0].u_area)
      // if (res.status === 200) {
      //   this.$message.success('添加订单成功')
      // } else {
      //   this.$message.error('添加订单失败')
      // }
      this.myArea = res.result[0].u_area
      // 返回id
      console.log(res.result[0]._id)
      this.sendOrder.o_username = res.result[0].u_name
      this.sendOrder.o_user = res.result[0]._id
      this.getO_server()
    },
    async getO_server () {
      const role = '配送专员'
      const { data: res } = await this.$http.get(`user/getalluser?u_area=${this.myArea}&u_role=${role}`)
      // 返回配送人员的ID
      // console.log(res.result[0]._id)
      this.sendOrder.o_server = res.result[0]._id
      this.sendOrder.o_servername = res.result[0].u_name
    }
  }
}
</script>

<style lang="less" scoped>
  .el-tabs {
     width: 90%;
     margin: 0px auto;
  }
</style>
