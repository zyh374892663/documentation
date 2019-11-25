import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './public/css/reset.css'
import './public/css/cover.css'
import initPlugin from '../.vuepress/common/js/initPlugin'

initPlugin()

export default ({
  Vue,
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Element)
}