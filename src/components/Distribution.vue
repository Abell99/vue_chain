<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/" style="font-size: 24px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          送货喽
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs type="card" value="first">
        <el-tab-pane label="每日计划" name="first">
            <el-tabs value="first" tab-position="left">
              <el-tab-pane label="今天">
                <el-table
                  :data="todyOrderList"
                  style="width: 100%">
                  <el-table-column
                    label="订单ID"
                    prop="_id">
                  </el-table-column>
                  <el-table-column
                    label="下单商家"
                    prop="o_username">
                  </el-table-column>
                  <el-table-column
                    label="状态">
                    <template v-slot="scope">
                      <el-switch
                        v-model="scope.row.o_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <!-- {{props.row.o_order.orderList}} -->
                      <span style="font-size: 24px; font-weight: 700;">订单详情:</span>
                      <table border="1" style="margin-left: 30px; margin-top: 10px; text-align: center;">
                        <thead>
                          <th>名称</th>
                          <th>分类</th>
                          <th>单价/元</th>
                          <th>数量</th>
                          <th>量词</th>
                          <th>总价</th>
                        </thead>
                        <tbody>
                          <tr v-for="item in props.row.o_order.orderList" :key="item.g_name">
                            <td>{{item.g_name}}</td>
                            <td>{{item.g_class}}</td>
                            <td>{{item.g_price}}</td>
                            <td>{{item.buyNumber}}</td>
                            <td>{{item.g_unit}}</td>
                            <td>{{item.g_value}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <span style="font-size: 24px; font-weight: 700;">总计:</span>
                      <span style="font-size: 20px; color: red; margin-left: 10px;">{{props.row.o_order.total}}</span>元
                      <br>
                      <span style="font-size: 24px; font-weight: 700;">留言:</span>
                      <span style="border: 1px solid beige; font-size: 20px; margin-left: 10px;">{{props.row.o_order.remark}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="昨天" name="first">
                <el-table
                  :data="yesterdayOrderList"
                  style="width: 100%">
                  <el-table-column
                    label="订单ID"
                    prop="_id">
                  </el-table-column>
                  <el-table-column
                    label="下单商家"
                    prop="o_username">
                  </el-table-column>
                  <el-table-column
                    label="状态">
                    <template v-slot="scope">
                      <el-switch
                        v-model="scope.row.o_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <!-- {{props.row.o_order.orderList}} -->
                      <span style="font-size: 24px; font-weight: 700;">订单详情:</span>
                      <table border="1" style="margin-left: 30px; margin-top: 10px; text-align: center;">
                        <thead>
                          <th>名称</th>
                          <th>分类</th>
                          <th>单价/元</th>
                          <th>数量</th>
                          <th>量词</th>
                          <th>总价</th>
                        </thead>
                        <tbody>
                          <tr v-for="item in props.row.o_order.orderList" :key="item.g_name">
                            <td>{{item.g_name}}</td>
                            <td>{{item.g_class}}</td>
                            <td>{{item.g_price}}</td>
                            <td>{{item.buyNumber}}</td>
                            <td>{{item.g_unit}}</td>
                            <td>{{item.g_value}}</td>
                          </tr>
                        </tbody>
                      </table> 
                      <span style="font-size: 24px; font-weight: 700;">总计:</span>
                      <span style="font-size: 20px; color: red; margin-left: 10px;">{{props.row.o_order.total}}</span>元
                      <br>
                      <span style="font-size: 24px; font-weight: 700;">留言:</span>
                      <span style="border: 1px solid beige; font-size: 20px; margin-left: 10px;">{{props.row.o_order.remark}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="刚早">
                <el-table
                  :data="moreOrderList"
                  style="width: 100%">
                  <el-table-column
                    label="订单ID"
                    prop="_id">
                  </el-table-column>
                  <el-table-column
                    label="下单商家"
                    prop="o_username">
                  </el-table-column>
                  <el-table-column
                    label="状态">
                    <template v-slot="scope">
                      <el-switch
                        v-model="scope.row.o_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <!-- {{props.row.o_order.orderList}} -->
                      <span style="font-size: 24px; font-weight: 700;">订单详情:</span>
                      <table border="1" style="margin-left: 30px; margin-top: 10px; text-align: center;">
                        <thead>
                          <th>名称</th>
                          <th>分类</th>
                          <th>单价/元</th>
                          <th>数量</th>
                          <th>量词</th>
                          <th>总价</th>
                        </thead>
                        <tbody>
                          <tr v-for="item in props.row.o_order.orderList" :key="item.g_name">
                            <td>{{item.g_name}}</td>
                            <td>{{item.g_class}}</td>
                            <td>{{item.g_price}}</td>
                            <td>{{item.buyNumber}}</td>
                            <td>{{item.g_unit}}</td>
                            <td>{{item.g_value}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <span style="font-size: 24px; font-weight: 700;">总计:</span>
                      <span style="font-size: 20px; color: red; margin-left: 10px;">{{props.row.o_order.total}}</span>元
                      <br>
                      <span style="font-size: 24px; font-weight: 700;">留言:</span>
                      <span style="border: 1px solid beige; font-size: 20px; margin-left: 10px;">{{props.row.o_order.remark}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="店家记录" name="second">根据店主来分批计划</el-tab-pane>
        <el-tab-pane label="店家信息" name="third">所有的店主信息</el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      orderList: [],
      // 获取当前用户的姓名
      myName: '',
      today: new Date(),
      todyOrderList: [],
      yesterdayOrderList: [],
      moreOrderList: []
    }
  },
  created () {
    this.getName()
  },
  methods: {
    async getName () {
      // 根据本地存储的手机号，获取用户信息
      const myPhone = window.sessionStorage.getItem('phone')
      const { data: res } = await this.$http.get(`user/getalluser?u_phone=${myPhone}`)
      this.myName = res.result[0].u_name
      // console.log(this.myName)
      this.getOrderList()
    },
    async getOrderList () {
      // 根据用户名来获取单据
      const { data: res } = await this.$http.get(`order/getorder/?o_servername=${this.myName}`)
      this.orderList = res.result
      const List = res.result
      console.log(this.orderList)
      // 对获取到的数据进行分配
      const year = this.today.getFullYear()
      let month = this.today.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = this.today.getDate()
      if (day < 10) {
        day = '0' + day
      }
      const today = year + '-' + month + '-' + day
      const yesterday = year + '-' + month + '-' + (day - 1)
      // 根据时间进行分配
      for (var item in List) {
        if (List[item].o_jointime.indexOf(today) > -1) {
          this.todyOrderList.push(List[item])
        } else if (List[item].o_jointime.indexOf(yesterday) > -1) {
          this.yesterdayOrderList.push(List[item])
        } else {
          this.moreOrderList.push(List[item])
        }
      }
      // 输出这三个看看
      console.log(this.todyOrderList)
      console.log(this.yesterdayOrderList)
      console.log(this.moreOrderList)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-card {
    width: 90%;
    margin: 0px auto;
  }
  td,th {
    border: 1px solid darkblue;
    text-align: center !important;
  }
</style>
