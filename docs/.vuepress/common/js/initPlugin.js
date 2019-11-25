import Vue from 'vue'
import confirm from '../components/MyConfirm/confirm'
const init = function () {
  // 公用消息提示框
  Vue.prototype._myConfirm = confirm
}

export default init
