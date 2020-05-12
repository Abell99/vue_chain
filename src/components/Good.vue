<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/" style="font-size: 24px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>货物管理界面</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <el-button type="primary" style="font-size: 16px;" icon="el-icon-circle-plus-outline" @click="addClassAialogVisible=true"  circle></el-button>
      <el-tabs v-model='newlist' tab-position="left" @tab-click="putClass(newlist)" >
        <el-tab-pane v-for="item in listName" :label="item" :key="item">
          <el-button type="danger" @click="listName.splice(listName.indexOf(newlist),1)">删除该分类</el-button>
          <el-button type="primary" @click="addGood(item)">添加{{item}}</el-button>
          <!-- 商品渲染表格 -->
          <!--  g_state: true
          g_img: "public/img/1587309872403_109951164334256252.jpg"
          _id: "5e9c6d31e1bd323244bb122b"
          g_class: "调料"
          g_name: "大蒜"
          g_price: 5
          g_unit: "捆"
          g_number: 90 -->
         <el-table
          :data="GoodList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand" style="position: relative;">
                <el-form-item label="类别">
                  <el-input
                    placeholder="请输入内容"
                    v-model="props.row.g_class"
                    :disabled="!needput">
                  </el-input>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input
                    placeholder="请输入内容"
                    v-model="props.row.g_price"
                    :disabled="!needput">
                  </el-input>
                </el-form-item>
                <el-form-item label="量词">
                  <el-input
                    placeholder="请输入内容"
                    v-model="props.row.g_unit"
                    :disabled="!needput">
                  </el-input>
                </el-form-item>
                <el-form-item label="存量">
                  <el-input
                    placeholder="请输入内容"
                    v-model="props.row.g_number"
                    :disabled="!needput">
                  </el-input>
                </el-form-item>
                <el-form-item label="图片">
                 <el-image
                    style="width: 100px; height: 100px"
                    :src="'http://127.0.0.1:1314/'+props.row.g_img"
                    >
                  </el-image>
                 <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:1314/upload"
                    :show-file-list="false"
                    v-show="needput"
                    :on-success="uploadSuccess"
                    :before-upload="uploadBefore">
                    <img v-if="putList.g_img" :src="'http://127.0.0.1:1314/'+putList.g_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>
                <el-button v-show="needput" type="success" icon="el-icon-check" @click="putGood(putList._id)" circle style="position: absolute; right: 20px; bottom: 20px;"></el-button>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            prop="g_name"
            width="160">
          </el-table-column>
          <el-table-column
            label="ID"
            prop="_id"
            width="160">
          </el-table-column>
          <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope">
              <el-switch
                style="margin-right: 10px;"
                v-model="scope.row.g_state"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="openPutGood(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteGood(scope.row._id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="添加分类"
        :visible.sync="addClassAialogVisible"
        width="50%">
        <el-form  label-position="top" ref="newClassRef" :rules="newClassRules" :model="newClass" label-width="80px">
          <el-form-item label="分类名称" prop="newClassName">
            <el-input v-model="newClass.newClassName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addClassAialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClass('newClassRef')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="'添加'+newlist+'品类'"
        :visible.sync="addGoodDialogVisible"
        width="60%">
        <el-form ref="addGoodList" :model="addGoodList" :rules="addGoodRules" label-width="80px">
          <el-form-item label="分类">
            <el-input disabled v-model="addGoodList.g_class"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="g_name">
            <el-input v-model="addGoodList.g_name"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="g_price">
            <el-input v-model="addGoodList.g_price"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="g_unit">
            <el-input v-model="addGoodList.g_unit"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="g_number">
            <el-input v-model="addGoodList.g_number"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:1314/upload"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="uploadBefore">
              <img v-if="addGoodList.g_img" :src="this.$http.defaults.baseURL+addGoodList.g_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addGoodDialogVisible = false">取 消</el-button>
          <el-button type="info">重置</el-button>
          <el-button type="primary" @click="addGoodDialog('addGoodList')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      listName: ['调料', '凉菜', '主食', '涮菜'],
      newClass: {
        newClassName: '调料'
      },
      // 当前所处分类
      newlist: '0',
      GoodList: [],
      needput: false,
      putList: {
        g_img: ''
      },
      // 添加货物的模态窗是否开启
      addGoodDialogVisible: false,
      addClassAialogVisible: false,
      addGoodList: {
        g_class: '',
        g_name: '',
        g_price: '',
        g_unit: '',
        g_number: '',
        g_img: ' '
      },
      addGoodRules: {
        g_name: [
          { required: true, message: '物品名称不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        g_price: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ],
        g_unit: [
          { required: true, message: '单位不能为空', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        g_number: [
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ]
      },
      newClassRules: {
        newClassName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGood()
  },
  methods: {
    addGood (newlist) {
      this.newlist = newlist
      this.addGoodList.g_class = newlist
      this.addGoodDialogVisible = true
    },
    uploadSuccess (res) {
      this.addGoodList.g_img = res.data.path
      this.putList.g_img = res.data.path
    },
    upPutSuccess (res) {
      this.putList.g_img = res.data.path
    },
    uploadBefore (file) {
      const limitMax = 5000 * 1024
      if (file.size > limitMax) {
        this.$messageTips('大小超出限制')
        return false
      }
    },
    // 确认添加货物表单
    addGoodDialog (goodlist) {
      // 获取表单属于,根据验证规则,进行提交前的判定
      this.$refs[goodlist].validate(async (valid) => {
        if (!valid) return this.$message.error('请检查表单数据')
        // 关闭模态框
        // addGoodDialogVisible = false
        const { data: res } = await this.$http.post('good/addgood', this.addGoodList)
        if (res.result.length !== 0) return this.$message.success('添加货物成功')
        this.getGood()
        this.addGoodDialogVisible = false
      })
    },
    // 添加分类
    addClass (newClass) {
      // 检查分类的填写情况
      // console.log(this.listName)
      // console.log(this.newClass.newClassName)
      // console.log(this.listName.indexOf(this.newClass.newClassName))
      if (this.listName.indexOf(this.newClass.newClassName) !== -1) return this.$message.error('该分类已存在')
      this.$refs[newClass].validate((valid) => {
        if (!valid) return this.$message.error('请检查表单数据')
        this.listName.push(this.newClass.newClassName)
        this.$message.success('添加分类成功')
      })
    },
    putClass (Class) {
      console.log(Class)
      this.newClass.newClassName = this.listName[Class]
      this.getGood()
    },
    async getGood () {
      const { data: res } = await this.$http.get(`good/getgood?g_class=${this.newClass.newClassName}`)
      if (res.status !== 200) return this.$message.error('获取货物失败')
      // this.$message.success('获取货物列表成功')
      this.GoodList = res.result
      // this.getGood()
      // this.addGoodDialogVisible = false
    },
    openPutGood (Row) {
      console.log('我点击了修改按钮')
      this.needput = !this.needput
      this.putList = Row
    },
    async putGood (Id) {
      // 获取改行的ID值
      // console.log(Id)
      const { data: res } = await this.$http.put(`/good/putgood/${Id}`, this.putList)
      if (res.status !== 200) return this.$message.error('物品信息修改失败')
      this.$message.success(res.message)
    },
    async deleteGood (Id) {
      // 删除这一列数据
      console.log(Id)
      const { data: res } = await this.$http.delete(`good/deletegood/${Id}`)
      if (res.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getGood()
    }
  }
}
</script>

<style lang="less" scoped>
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
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
