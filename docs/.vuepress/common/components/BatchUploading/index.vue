<template>
  <!-- import dialog start-->
  <div>
    <el-dialog
      :visible.sync="importFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      title="导入数据"
      custom-class="importFile"
    >
      <el-form :model="reportForm">
        <el-form-item :label-width="formLabelWidth" label="选择文件">
          <el-upload
            ref="upload"
            :on-error="uploadError"
            :headers="headers"
            :on-success="handleExcelSuccess"
            :auto-upload="false"
            :action="action"
            :limit="limit"
            class="upload-demo"
          >
            <div class="viewFile">
              <img :src="imagePath" alt="浏览" />
              <p class="viewText">浏览</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="下载模板">
          <a
            :href="tempHref"
            target="_blank"
            style="
              display:inline-block;
              width:98px;
              height:32px;
              line-height:32px;
              background:rgba(0,96,114,0.1);
              border-radius:4px;
              color:#006072;text-align:center;"
          >下载模板</a>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-dialog-sub" @click="cancel">取消</el-button>
        <el-button type="primary" class="btn-dialog-primary" @click="submitUpload">保存</el-button>
      </div>
    </el-dialog>
    <!-- 报错弹窗 start -->
    <el-dialog :visible.sync="errorDialog" title="错误提示" width="50%" class="err_dialog">
      <div class="el-message-box__content">
        <div class="el-message-box__status el-icon-error" />
        <div class="el-message-box__message">
          <p>{{ errMsg }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="partSuccessConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from '@/common/js/utils/auth'
export default {
  name: 'BatchUploading',
  props: {
    dataShow: {
      type: Boolean,
      required: true
    },
    dataTempurl: {
      type: String,
      required: true
    },
    dataAction: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imagePath: require('../../../public/imgs/addFile.png'),
      formLabelWidth: '120px',
      reportForm: {
        name: '',
        hotelCode: ''
      },
      headers: {
        //  + getToken()
        Authorization: 'bearer'
      },
      importFormVisible: this.dataShow,
      action: this.dataAction,
      limit: 1,
      tempHref: this.dataTempurl,
      errMsg: '',
      errorDialog: false
    }
  },
  watch: {
    dataShow(newVal) {
      this.importFormVisible = newVal
    },
    dataTempurl(newVal) {
      this.tempHref = newVal
    },
    dataAction(newVal) {
      this.action = newVal
    }
  },
  methods: {
    // 上传失败
    uploadError(error) {
      const _mes = JSON.parse(error.message).message
      this.errMsg = _mes
      this.errorDialog = true
    },
    // 上传成功
    handleExcelSuccess(res, file) {
      console.log(typeof res.data)
      if (typeof res.data === 'number') {
        this.$message({
          type: 'success',
          message: `成功导入${res.data}条数据`
        })
      } else {
        this.$message({
          type: 'success',
          message: '导入数据成功'
        })
      }
      this.$refs.upload.clearFiles() // 上传成功后清除上传列表
      if (res.message !== '导入成功' && res.message !== 'success') {
        this.errMsg = res.message
        this.errorDialog = true
      } else {
        this.importSuccess()
      }
    },
    // 导入成功通信
    importSuccess() {
      this.$emit('importSuccess', true)
    },
    // 批量导入用户
    importForm() {
      this.importFormVisible = true
    },
    // 保存导入
    submitUpload() {
      this.$refs.upload.submit()
      this.cancel()
    },
    // 取消
    cancel() {
      this.errorDialog = false
      this.$emit('cancel', false)
    },
    // 部分导入成功dialog确定事件
    partSuccessConfirm() {
      this.cancel()
      this.importSuccess()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
