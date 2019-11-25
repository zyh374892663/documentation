import Vue from 'vue'
import message from './index.vue'
const VueComponent = Vue.extend(message)
const vm = new VueComponent().$mount()
let init = false
const defaultOptions = {
  yesBtnText: '确定',
  noBtnText: '取消'
}

const confirm = function(options) {
  Object.assign(vm, defaultOptions, options, {
    type: 'confirm'
  })

  if (!init) {
    document.body.appendChild(vm.$el)
    init = true
  }

  return vm.confirm()
}

export default confirm
