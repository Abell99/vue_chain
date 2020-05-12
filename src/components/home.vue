<template>
  <el-container>
    <el-header height="87px" class="hidden-md-and-up">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand ><h1><img width="50px" height="50px" src="../assets/img/logo.png" alt="商标"></h1></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>喜涮涮转转小火锅</b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form> -->

            <b-nav-item-dropdown text="导航" right>
              <b-dropdown-item href="#">关于我们</b-dropdown-item>
              <b-dropdown-item href="#">配送货管理</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ newuser }}</em>
              </template>
              <b-dropdown-item href="#">{{ login }}</b-dropdown-item>
              <!-- <b-dropdown-item href="#">个人中心</b-drospdown-item> -->
              <template v-if="islogin">
                <b-dropdown-item href="#"><b>退出</b></b-dropdown-item>
              </template>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </el-header>
    <el-container>
      <el-aside width="400px" class="hidden-sm-and-down">
          <el-header>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <h1><img width="50px" height="50px" src="../assets/img/logo.png" alt="商标" style="cursor: pointer;"></h1>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link"  style="font-size: 14px; cursor: pointer;">
                      我的门店<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-show="activeUser.u_role==='管理员'"><el-button type="text" @click="openUser">用户管理</el-button></el-dropdown-item>
                      <el-dropdown-item v-show="activeUser.u_role==='管理员'"><el-button type="text" @click="openGood">货物管理</el-button></el-dropdown-item>
                      <el-dropdown-item v-show="activeUser.u_role==='管理员'"><el-button type="text" @click="openUser">订单管理</el-button></el-dropdown-item>
                      <el-dropdown-item v-show="activeUser.u_role==='商家'"><el-button type="text" @click="openBuy">进货界面</el-button></el-dropdown-item>
                      <el-dropdown-item v-show="activeUser.u_role==='配送专员'"><el-button type="text" @click="openDb">送货界面</el-button></el-dropdown-item>
                      <el-dropdown-item v-show="activeUser.u_role!=='管理员'" :disabled="!islogin"><el-button type="text" @click="openUser">个人中心</el-button></el-dropdown-item>
                      <el-dropdown-item divided>
                        <el-button :type="!islogin? 'primary':'danger'" @click='loginUser'>{{login}}</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link"  style="font-size: 14px; cursor: pointer;">
                      关于我们<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                      <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
              <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
          </el-header>
          <el-dialog
            @close="loginFormClose"
            title="提示"
            :visible.sync="loginDialogVisible"
            width="500px">
            <el-form :rules="loginRuleForm" ref="loginFormRef" label-position="left"  :model="loginForm"  label-width="65px" tyle="padding-right: 20px;">
              <el-form-item label="手机号" prop="u_phone">
                <el-input v-model="loginForm.u_phone"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="u_psd">
                <el-input type="password" v-model="loginForm.u_psd"></el-input>
               </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="loginDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="loginButton">确 定</el-button>
            </span>
          </el-dialog>
          <el-main>
            <div>
              <img src="../assets/img/img1.png" alt="">
              <p>难得<b style="font-size: 20px; color: #e30000;">相聚</b>，<br/> 一起 <br/> 撸一顿<b style="font-size: 20px; color: #e30000;">嘻唰唰</b>吧!!!</p>
              <img width="300px" height="300px" src="../assets/img/img2.png" alt="">
            </div>
          </el-main>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      loginDialogVisible: false,
      newuser: '未登录',
      login: '登录',
      islogin: false,
      activeUser: {
        u_phone: '',
        u_role: ''
      },
      loginForm: {
        u_phone: '',
        u_psd: ''
      },
      loginRuleForm: {
        u_phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        u_psd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginUser () {
      if (this.login === '登录') {
        // console.log('我点击了登录按钮')
        this.loginDialogVisible = true
      } else {
        window.sessionStorage.clear()
        this.login = '登录'
        this.islogin = false
        this.newuser = '未登录'
        this.activeUser.u_phone = ''
        this.activeUser.u_role = ''
        this.$router.push({ path: 'home' })
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    loginFormClose () {
      // console.log('123456')
      this.loginForm.u_phone = ''
      this.loginForm.u_psd = ''
    },
    loginButton () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error('登录失败')
        const { data: res } = await this.$http.post('/user/login', this.loginForm)
        if (!res.result) return this.$message.error('后台验证失败')
        if (res.result.u_state !== true) return this.$message.error('该用户未启用')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('role', res.result.u_role)
        window.sessionStorage.setItem('phone', res.result.u_phone)
        this.newuser = this.activeUser.u_role
        this.activeUser.u_phone = res.result.u_phone
        this.activeUser.u_role = res.result.u_role
        this.login = '退出'
        this.islogin = true
        this.loginDialogVisible = false
      })
    },
    openUser () {
      console.log('我应该跳转到user管理界面')
      this.$router.push({ path: '/user' })
    },
    openGood () {
      console.log('我应该跳转到good管理界面')
      this.$router.push({ path: '/good' })
    },
    openBuy () {
      console.log('我应该跳转到下单界面')
      this.$router.push({ path: '/buy' })
    },
    openDb () {
      console.log('我应该跳转到送货界面')
      this.$router.push({ path: '/db' })
    }
  },
  created () {
    this.activeUser.u_phone = window.sessionStorage.getItem('phone')
    this.activeUser.u_role = window.sessionStorage.getItem('role')
    if (window.sessionStorage.getItem('role')) {
      this.newuser = window.sessionStorage.getItem('role')
      this.login = '退出'
      this.islogin = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  padding: 0px;
  height: 100%;
  > .el-header {
    padding: 0px;
    box-shadow: 10px 10px 5px #888888;
    z-index: 10;
    .bg-info {
      background-color: #17a2b833;
      .navbar-nav {
        font-size: 24px;
        font-family: '楷体';
      }
    }
  }
  > .el-main {
    padding: 0px;
    padding-top: 40px;
  }
  .el-aside {
    padding-top: 20px;
    box-shadow: 10px 10px 10px #F0F0F0;
    >.el-header {
      >.el-row {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
