<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/" style="font-size: 24px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理界面</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
    <el-card style="position: relative;">
      <el-switch
        style="position: absolute; right: 8px; top: 10px; z-index: 1;"
        v-model="isGet"
        active-text="检索">
      </el-switch>
      <el-form v-show="isGet" style="position: relative; padding-bottom: 50px;" :inline="true" :model="getForm" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="getForm.u_name" placeholder="请输入要查询的用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="getForm.u_phone" placeholder="请输出要查询的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="getForm.u_role" placeholder="请输入要查询的用户身份">
            <el-option label="配送专员" value="配送专员"></el-option>
            <el-option label="商家" value="商家"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
           <v-distpicker :province="getForm.u_province" :city="getForm.city" :area="getForm.u_area" @selected="onGetSelected"></v-distpicker>
        </el-form-item>
        <el-form-item style="position: absolute; right: 0px; bottom: -5px">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-tabs type="border-card">
        <el-tab-pane label="用户列表">
         <el-table
            :data="userList"
            style="width: 100%"
            >
            <el-table-column
              type="index"
              fixed="left">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_name"
              label="姓名"
              fixed="left"
              width="80">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_role"
              label="身份"
              width="80">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_phone"
              label="手机号"
              width="120">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_town"
              label="地址"
              width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_sex"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_brithday"
              label="生日"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="u_jointime"
              label="加入时间"
              width="180">
            </el-table-column>
            <el-table-column
            sortable
            label="状态"
            fixed="right"
            width="80">
              <!-- 作用域插槽的使用 -->
              <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                <el-switch
                @change="changState(scope.row._id, scope.row.u_state, scope.row.u_role)"
                :disabled= "scope.row.u_role.length===3"
                v-model="scope.row.u_state"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="120">
              <template  slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="openPutUser(scope.row)"></el-button>
<!--                <el-popconfirm icon="el-icon-delete"
                  title="这是一段内容确定删除吗？"
                > -->
                  <el-button :disabled= "scope.row.u_role.length===3" type="danger" icon="el-icon-delete" circle @click="delectUser(scope.row)"></el-button>
                <!-- </el-popconfirm> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[4, 8, 15, 20]"
            :page-size="8"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="添加用户">
          <el-form :model="putuser" label-position="top" ref="adduser" :rules="putUserRules">
            <el-form-item label="姓名" label-width="80px" prop="u_name">
              <el-input v-model="putuser.u_name"></el-input>
            </el-form-item>
            <el-form-item  label="手机号码" label-width="80px" prop="u_phone">
              <el-input v-model="putuser.u_phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px"  prop="u_psd">
              <el-input v-model="putuser.u_psd"></el-input>
            </el-form-item>
            <el-form-item label="性别" label-width="80px" prop="u_sex">
              <el-select v-model="putuser.u_sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份" label-width="80px" prop="u_role">
              <el-select v-model="putuser.u_role" placeholder="请选择身份">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="商家" value="商家"></el-option>
                <el-option label="配送专员" value="配送专员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker
                v-model="putuser.u_brithday"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="地区">
            <v-distpicker :province="putuser.u_province" :city="putuser.u_city" :area="putuser.u_area" @selected="onSelected"></v-distpicker>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input width="200px" type = "textarea" placeholder="请输入内容" maxlength="30" :show-word-limit="true" v-model="putuser.u_town">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitAddUserForm('adduser')">立即创建</el-button>
              <el-button @click="resetAddUserForm('adduser')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <!-- 这里是修改用户的对话框 -->
      <el-dialog :model="putuser" ref="putuser" :rules="putUserRules" title="修改用户信息" :visible.sync="putUserDialogFormVisible">
        <el-form  label-position="top" :model="putuser" ref="putuser" :rules="putUserRules">
          <el-form-item label="姓名" label-width="80px" prop="u_name">
            <el-input v-model="putuser.u_name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px" prop="u_phone">
            <el-input disabled v-model="putuser.u_phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px"  prop="u_psd">
            <el-input v-model="putuser.u_psd"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="80px" prop="u_sex">
            <el-select v-model="putuser.u_sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份" label-width="80px" prop="u_role">
            <el-select v-model="putuser.u_role" placeholder="请选择身份">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="商家" value="商家"></el-option>
              <el-option label="配送专员" value="配送专员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="putuser.u_brithday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地区">
          <v-distpicker :province="putuser.u_province" :city="putuser.u_city" :area="putuser.u_area" @selected="onSelected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input width="200px" type = "textarea" placeholder="请输入内容" maxlength="30" :show-word-limit="true" v-model="putuser.u_town">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="putUserDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="putUserDialogForm('putuser')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      isGet: false,
      getForm: {
        u_name: '',
        u_phone: '',
        u_role: '',
        u_province: '',
        u_city: '',
        u_area: ''
      },
      userList: [],
      input: '',
      select: '',
      currentPage: 1,
      total: 0,
      num: 1, // 当前页
      skip: 0, // 跳过多少条
      limit: 8, // 限制数量
      // limit----限制查询数量  skip----跳过多少条数据
      putuser: {
        u_name: '',
        u_psd: '',
        u_phone: '',
        u_sex: '',
        u_role: '',
        u_brithday: '',
        u_province: '',
        u_city: '',
        u_area: '',
        u_town: ''
      },
      putUserDialogFormVisible: false,
      putUserRules: {
        u_name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '姓名长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        u_psd: [
          { required: true, message: '请输入此账号密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        u_phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 3, max: 11, message: '手机号长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        u_role: [
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ],
        u_sex: [
          { required: true, message: '请选择用户性别', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    console.log('开始获取数据')
    this.getUserList()
    this.alltotal()
    this.$message.success('获取用户列表成功')
    // console.log(this.allcity)
  },
  methods: {
    getUser () {
      this.getUserList()
      this.alltotal()
    },
    async getUserList () {
      const { data: res } = await this.$http.get(`user/getuser/${this.skip}/${this.limit}/?${this.select}=${this.input}`)
      if (!res.result) return this.$message.error('获取用户列表失败')
      // console.log(res)
      // this.$message.success('用户列表获取成功')
      this.userList = res.result
    },
    async alltotal () {
      const { data: allres } = await this.$http.get(`user/getalluser/?${this.select}=${this.input}`)
      // if (!res.result) return this.$message.error('获取用户列表失败')
      this.total = allres.result.length
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.skip = this.skip * (this.num - 1)
      this.getUserList()
      this.alltotal()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.num = val
      this.skip = this.limit * (this.num - 1)
      this.getUserList()
      this.alltotal()
    },
    async changState (newId, newState, Role) {
      console.log(Role.length)
      if (Role === '管理员') {
        return this.$message.error('不允许修改管理员状态')
      }
      console.log('要修改的值的默认id为' + newId + '修改状态值为:' + newState)
      const { data: res } = await this.$http.put(`/user/putuser/${newId}`, { u_state: newState })
      console.log(res)
    },
    openPutUser (body) {
      console.log(body)
      this.putuser._id = body._id
      this.putuser.u_name = body.u_name
      this.putuser.u_psd = body.u_psd
      this.putuser.u_phone = body.u_phone
      this.putuser.u_sex = body.u_sex
      this.putuser.u_role = body.u_role
      this.putuser.u_brithday = body.u_brithday
      this.putuser.u_province = body.u_province
      this.putuser.u_city = body.u_city
      this.putuser.u_area = body.u_area
      this.putuser.u_town = body.u_town
      // console.log('打开修改界面')
      this.putUserDialogFormVisible = true
      console.log(body)
    },
    // handleChange (value) {
    //   // console.log(value)
    // },
    onSelected (data) {
      this.putuser.u_province = data.province.value
      this.putuser.u_city = data.city.value
      this.putuser.u_area = data.area.value
    },
    resetAddUserForm (form) {
      this.$refs[form].resetFields()
      this.putuser.u_brithday = ''
      this.putuser.u_province = ''
      this.putuser.u_city = ''
      this.putuser.u_area = ''
      this.putuser.u_town = ''
    },
    async submitAddUserForm (form) {
      this.$refs[form].validate(async valid => {
        if (!valid) return this.$message.error('表单信息错误')
        const { data: res } = await this.$http.get(`/user/getalluser/?u_phone=${this.putuser.u_phone}`)
        if (res.result.length !== 0) {
          return this.$message.error('该用户已存在，无法重复添加')
        } else {
          console.log('允许添加')
          const { data: addres } = await this.$http.post('user/adduser', this.putuser)
          console.log(addres)
        }
        this.$message.success('用户添加成功')
        this.getUserList()
        this.alltotal()
      })
    },
    putUserDialogForm (form) {
      console.log(form)
      this.$refs[form].validate(async valid => {
        if (!valid) return this.$message.error('表单信息错误')
        // this.$message.success('表单信息无误')
        // console.log(this.putuser._id)
        const { data: res } = await this.$http.put(`user/putuser/${this.putuser._id}`, this.putuser)
        console.log(res)
        this.$message.success('用户信息修改成功')
        this.putUserDialogFormVisible = false
        this.getUserList()
        this.alltotal()
      })
    },
    async delectUser (params) {
      console.log(params)
      const { data: res } = await this.$http.delete(`/user/deleteuser/${params._id}`)
      console.log(res)
      this.getUserList()
      this.alltotal()
    },
    async onSubmit () {
      console.log('我点击了查询')
      console.log(this.getForm)
      // 参数处理
      const { data: res } = await this.$http.get(`/user/getalluser/?u_name=${this.getForm.u_name}&u_phone=${this.getForm.u_phone}&u_role=${this.getForm.u_role}&u_province=${this.getForm.u_province}&u_city=${this.getForm.u_city}&u_area=${this.getForm.u_area}&`)
      console.log(res)
      this.userList = res.result
    },
    onReset () {
      console.log('我点击了重置')
      this.getForm.u_name = ''
      this.getForm.u_phone = ''
      this.getForm.u_role = ''
      this.getForm.u_province = ''
      this.getForm.u_city = ''
      this.getForm.u_area = ''
      this.onSubmit()
    },
    onGetSelected (data) {
      this.getForm.u_province = data.province.value
      this.getForm.u_city = data.city.value
      this.getForm.u_area = data.area.value
    }
  }
}
</script>

<style lang="less" scoped="">
  .el-card {
    width: 90%;
    margin: 0px auto;
    .el-card__header {
      padding-bottom: 10px;
    }
  }
  .el-breadcrumb {
    margin-bottom: 0px;
  }
  .el-input-group {
    width: 350px;
    margin-bottom: 15px;
  }
  .el-input-group[data-v-73968b0a] {
    width: 80%;
  }
</style>
