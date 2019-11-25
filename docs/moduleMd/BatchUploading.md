### BatchUploading 批量上传

**用户批量上传通用组件**

<el-button type="text" @click="open">打开批量上传</el-button>
```html
<BatchUploading
  :data-action="exceData"
  :data-show="importFormVisible"
  :data-tempurl="tempHref"
  @cancel="hideBatchUploading"
  @importSuccess="importSuccessEvent"
/>
```
```js
export default {
  data () {
    return {
      exceData: process.env.BASE_API + '/bzy-tr/supplier/import', // 上传接口地址
      importFormVisible: false, // 批量上传控制器
      tempHref: 'http://sk-pro-file.oss-cn-shanghai.aliyuncs.com/tr/templates/供应商信息导入模板.xls', // 模板地址
    }
  },
  components: {
    BatchUploading
  },
  methods: {
    open() {
      this.importFormVisible = true
    },
    // 隐藏批量上传dialog
    hideBatchUploading(bool) {
      this.importFormVisible = bool
    },
    // 导入成功回调函数
    importSuccessEvent(bool) {
      console.log(bool)
    },
  }
}
```

#### props
键                | 描述                    |  默认值   
:----------       |:---------              |:----------
dataAction        | 上传接口地址             | 无 
dataShow          | 控制显示隐藏             | 无 
dataTempurl       | 下载模板地址             | 无 

#### 事件
键                | 描述                    |  默认值   
:----------       |:---------              |:----------
cancel           | 接收隐藏dialog通知，隐藏dialog  | 无 
importSuccess    | 上传成功回调             | 无 

<!-- 批量上传 -->
<BatchUploading
  :data-action="exceData"
  :data-show="importFormVisible"
  :data-tempurl="tempHref"
  @cancel="hideBatchUploading"
  @importSuccess="importSuccessEvent"
/>
<script>
import BatchUploading from '../../docs/.vuepress/common/components/BatchUploading'
export default {
  data () {
    return {
      // exceData: process.env.BASE_API + '/bzy-tr/supplier/import', // 上传接口地址
      exceData: 'http://bzyadmin.hhotel.com' + '/bzy-tr/supplier/import', // 上传接口地址
      importFormVisible: false, // 批量上传控制器
      tempHref: 'http://sk-pro-file.oss-cn-shanghai.aliyuncs.com/tr/templates/供应商信息导入模板.xls', // 模板地址
    }
  },
  components: {
    BatchUploading
  },
  methods: {
    open() {
      this.importFormVisible = true
    },
    // 隐藏批量上传dialog
    hideBatchUploading(bool) {
      this.importFormVisible = bool
    },
    // 导入成功回调函数
    importSuccessEvent(bool) {
      console.log(bool)
    },
  }
}
</script>
