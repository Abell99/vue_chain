<template>
  <el-card class="box-card">
    <!-- 轮播图区域 -->
    <div class="block" style="width: 100%; margin: 0px auto; border: 0px solid #D1ECF1; border-radius: 5px;">
      <el-carousel height="450px">
        <el-carousel-item v-for="item in imgarr" :key="item.name">
          <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
            <img width="100%" :src="item.src" alt="">
          </el-tooltip>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="20" style="padding-top: 10px; padding-bottom: 10px;">
      <el-col :span="8"><div class="grid-content bg-purple"><img width="100%" height="200px" src="../assets/img/img_2.jpg" alt=""></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"><img width="100%" height="200px" src="../assets/img/img_1.jpg" alt=""></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"><img width="100%" height="200px" src="../assets/img/img_3.jpg" alt=""></div></el-col>
    </el-row>
    <el-card style="padding-top: 10px; margin-bottom: 10px;">
      <h2>分享属于您的精彩：</h2>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-card>
    <el-card>
      <h2>各地门店分享店内实况：</h2>
      <div class="flexImg">
        <img width="200px" height="200px" v-for="item in imgarr" :src="item.src" :key="item.id">
      </div>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imgarr: [
        { id: 1, name: '总店', src: '/img/img_1.c6fb3d30.jpg' },
        { id: 2, name: '标准店员服装', src: '/img/img_2.d807e70a.jpg' },
        { id: 3, name: '营业实况,监控实拍', src: '/img/img_3.fbdf6e5f.jpg' },
        { id: 4, name: '食品展示', src: '/img/img_4.5e75f317.jpg' }
      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    width: 90%;
    margin: 0px auto;
    border: 0px solid #D1ECF1; border-radius: 5px;
  }
  .el-carousel__container {
    width: 100%;
    margin: 0px auto;
    border: 0px solid #D1ECF1; border-radius: 5px;
    overflow: hidden;
  }
  .el-carousel__item {
    width: 100%;
    height: 100%;
    border: 0px solid #D1ECF1; border-radius: 5px;
    overflow: hidden;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    border: 0px solid #D1ECF1; border-radius: 5px;
  }
  .flexImg {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .flexImg>img{
    margin: 5px;
  }
</style>
