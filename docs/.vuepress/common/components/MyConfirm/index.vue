/*
** _myConfirm调用方法
**  this._myConfirm({
**    title: '提示',
**    msg: '模式未保存，确定离开？',
**    yesBtnText: '确定'
**    noBtnText: '取消'
**    type: 'success', success(成功) stop(停用) xiougai(修改) jiebang(解绑) hint(提示) error(报错) delete(删除)
**  }).then(() => {
**    console.log('yes')
**  }).catch(() => {
**    console.log('cancel')
**  })
*/
<template>
  <div
    v-if="show"
    id="myConfirm"
    tabindex="-1"
    role="dialog"
    class="el-message-box__wrapper"
    style="z-index: 2003;"
  >
    <div class="el-message-box">
      <div class="el-message-box__header">
        <div class="el-message-box__title" />
      </div>
      <div class="el-message-box__content">
        <div class="el-message-box__message">
          <div class="icon_box">
            <img src="../../../public/imgs/pic_success.png" alt />
          </div>
          <span class="title">{{ title }}</span>
          <p class="content" v-html="msg" />
        </div>
      </div>
      <div class="el-message-box__btns">
        <button
          type="button"
          class="el-button el-button--default el-button--small"
          @click.prevent="noClick"
        >
          <span>{{ noBtnText }}</span>
        </button>
        <button
          type="button"
          class="el-button el-button--default el-button--small el-button--primary"
          @click.prevent="yesClick"
        >
          <span>{{ yesBtnText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyConfirm',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    msg: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'success'
    },
    alertBtnText: {
      type: String,
      default: '我知道了'
    },
    yesBtnText: {
      type: String,
      default: '确定'
    },
    noBtnText: {
      type: String,
      default: '取消'
    },
    hasMark: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      promiseStatus: null,
      show: false
    }
  },
  methods: {
    confirm() {
      const _this = this
      this.show = true
      return new Promise(function (resolve, reject) {
        _this.promiseStatus = { resolve, reject }
      })
    },
    noClick() {
      this.show = false
      this.promiseStatus && this.promiseStatus.reject()
    },
    yesClick() {
      this.show = false
      this.promiseStatus && this.promiseStatus.resolve()
    },
    alertClick() {
      this.show = false
      this.promiseStatus && this.promiseStatus.resolve()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
#myConfirm /deep/
  background-color: rgba(0, 0, 0, 0.4)
  font-family: PingFang-SC

  .el-message-box
    border-radius: 4px
    padding-bottom: 32px

    .el-message-box__header
      padding: 25px 15px

    .el-message-box__content
      text-align: center

      // height: 250px
      .icon_box
        height: 120px
        margin-bottom: 13px

        .svg-icon
          width: 280px
          height: 120px

      .title
        font-size: 18px
        line-height: 25px
        font-weight: bold
        color: rgba(51, 51, 51, 1)

      .content
        width: 238px
        margin: 0 auto
        margin-top: 4px
        min-height: 58px
        line-height: 20px
        color: rgba(103, 103, 103, 1)
        font-size: 14px

  .el-message-box__btns
    display: flex
    justify-content: center
    padding: 0 64px

    button
      width: 180px
      border-radius: 20px

  .el-message-box__btns button:nth-child(2)
    margin-left: 32px
</style>
