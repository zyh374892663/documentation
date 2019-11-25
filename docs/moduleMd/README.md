---
title: 'MyConfirm'
---
# MyConfirm 弹框
**当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。**
#### 调用方法
```js
this._myConfirm({
  title: '提示',
  msg: '描述',
  yesBtnText: '确定',
  noBtnText: '取消',
  type: 'success',
}).then(() => {
  console.log('yes')
}).catch(() => {
  console.log('cancel')
})
// type类型：success(成功) stop(停用) xiougai(修改) jiebang(解绑) hint(提示) error(报错) delete(删除)
```
<template>
  <div class="test-demo">
    <p>基础展示</p>
    <el-button type="text" @click="open">MyConfirm demo</el-button>
    <p>msg参数可以是html 插入特殊样式</p>
    <el-button type="text" @click="open1">MyConfirm demo2</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello VuePress!'
    }
  },
  methods: {
    open() {
      this._myConfirm({
        title: '提示',
        msg: '描述',
        yesBtnText: '确定',
        noBtnText: '取消',
        type: 'success',
      }).then(() => {
        console.log('yes')
      }).catch(() => {
        console.log('cancel')
      })
    },
    open1() {
      this._myConfirm({
        title: '提示',
        msg: `您是否确认在<span style='color: #006072'>hhotel酒店</span>项目中停用 <span style='color: #006072'>装修项目</span>？`,
        yesBtnText: '确定',
        noBtnText: '取消',
        type: 'success',
      }).then(() => {
        console.log('yes')
      }).catch(() => {
        console.log('cancel')
      })
    }
  }
}
</script>