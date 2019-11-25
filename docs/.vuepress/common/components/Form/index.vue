/* 表单组件 */
<template>
  <div class="formView">
    <slot name="header" />
    <el-form
      v-if="$route.name !== 'HotelManageView' && dataOperationtype !== 2"
      ref="form"
      :rules="rules"
      :model="form"
      :label-position="'left'"
      class="edit"
      label-width="173px"
      style="padding-left:20px;max-width: 630px;padding-right: 20px"
    >
      <div class="infoList">
        <el-form-item
          v-for="item in formListFilter"
          :key="item.key"
          :label="item.label"
          :prop="item.key"
        >
          <!-- 普通input输入 -->
          <el-input
            v-if="item.type === 'input' || item.type === 'number'"
            :type="item.type === 'input' ? 'text' : item.type"
            v-model.trim="form[item.key]"
            :placeholder="item.placeholder"
            :style="{ width: item.width ? item.width : '100%'}"
            @change="changeBindData"
          />
          <el-radio-group v-if="item.type === 'radio'" v-model="form[item.key]">
            <el-radio
              v-for="item in item.options"
              :key="item.value"
              :label="item.value"
            >{{ item.label }}</el-radio>
          </el-radio-group>
          <!-- 二级省市联动 -->
          <el-cascader
            v-if="item.type === 'region'"
            v-model="form[item.key]"
            :options="item.options"
            :props="propsSingle"
            :placeholder="item.placeholder"
            :style="{ width: item.width ? item.width : '100%' }"
            multiline
            clearable
            filterable
            @change="changeBindData('city')"
          />
          <!-- 省市多选 -->
          <el-cascader
            v-if="item.type === 'cityMultiple'"
            v-model="form[item.key]"
            :options="item.options"
            :props="{ multiple: true, value:'code',label:'name', expandTrigger: 'hover' }"
            :style="{ width: item.width ? item.width : '100%' }"
            placeholder="请选择"
            filterable
            collapse-tags
            clearable
            @change="changeBindData('cityMultiple', item)"
          />
          <!-- 普通select -->
          <el-select
            v-if="item.type === 'select'"
            :placeholder="item.placeholder"
            v-model="form[item.key]"
            :style="{ width: item.width ? item.width : '100%' }"
            @change="changeBindData"
          >
            <el-option
              v-for="ele in item.options"
              :key="ele.value"
              :label="ele.label"
              :value="ele.value"
            />
          </el-select>
          <!-- 普通select + input 开户行 -->
          <div v-if="item.type === 'selectInput'">
            <el-select
              :placeholder="item.placeholder"
              v-model="bankInfo"
              filterable
              clearable
              style="width: 46.1%"
              @change="changeBindData"
            >
              <el-option
                v-for="(ele, i) in item.options"
                :key="ele.value"
                :label="ele.value"
                :value="i"
              />
            </el-select>
            <el-input
              v-model="form[item.key]"
              :disabled="bankInfo === null"
              style="width: 52.53%"
              @change="changeBindData"
            />
          </div>
        </el-form-item>
        <el-form-item v-if="isBtnGroup">
          <el-button :loading="loadingFlag" type="primary" @click="save">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-form-item>
      </div>
    </el-form>

    <!-- 查看 -->
    <el-form
      v-if="$route.name !== 'HotelManageView' && dataOperationtype === 2"
      :model="form"
      :label-position="'left'"
      label-width="173px"
      style="padding-left:20px;"
    >
      <div class="infoList">
        <el-form-item
          v-for="item in formListFilter"
          :key="item.key"
          :label="item.label"
          :prop="item.key"
        >
          <span class="viewInfo">{{ form[item.key] }}</span>
        </el-form-item>
      </div>
      <!-- <div v-if="isBtnGroup" class="back" @click="goBack">返回</div> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormView',
  props: {
    /*
    ** dataSetting:               包含title(String),list(Array)
    ** dataSetting.title: String, 标题
    ** dataSetting.list: Array,   用于渲染form DOM
    **  label: String,            表单label
    **  key: String,              通过formObj动态生成form数据对象
    **  value: String || Array,   通过formObj动态生成form数据对象的参数
    **  type: String,             判断生成的form input元素类型
    **  placeholder: String,      用于提示
    **  width: String,            用于设置输入框宽度，不写默认434px
    **  isRequired: Boolen,       判断是否需要必填，并生成校验对象
    **  options: [],              下拉框单选多选枚举值
    **  validate: String,         校验类型
    **    mobile -> 手机号         validatePhone
    **    select -> select        trigger change
    **    email  -> 邮箱验证       checkEmail
    */
    dataSetting: {
      type: Object,
      required: true,
      default() {
        return {
          title: '',
          list: []
        }
      }
    },
    /*
    ** dataIsbtngroup: 是否显示按钮组
    */
    dataIsbtngroup: {
      type: Boolean,
      default() {
        return false
      }
    },
    /*
    ** dataIsbtngroup: 判断是否整体校验form
    */
    dataIsrequired: {
      type: Boolean,
      default() {
        return false
      }
    },
    /*
    ** dataOperationtype: 操作状态： 1创建 2查看 3编辑 查看最好把数据整理好放在dataSetting.list的value中
    */
    dataOperationtype: {
      type: Number,
      default() {
        return 1
      }
    },
    /*
    ** dataBankindex: 开户行数据回显
    */
    dataBankindex: {
      type: Number,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      select: '',
      title: this.dataSetting.title,
      form: {},
      rules: this.createRules(),
      formList: this.dataSetting.list,
      isBtnGroup: this.dataIsbtngroup,
      loadingFlag: false,
      propsSingle: {
        value: 'code',
        label: 'name',
        expandTrigger: 'hover'
      },
      city: [], // 所在城市下拉数据
      bankInfo: this.dataBankindex
    }
  },
  computed: {
    formListFilter() {
      if (this.formList) {
        let formList = []
        formList = this.formList.filter(item => item.label)
        return formList
      }
    }
  },
  watch: {
    dataSetting(newVal) {
      if (newVal) {
        this.title = newVal.title
        this.form = this.formObj()
        this.rules = this.createRules()
        this.formList = this.dataSetting.list
      }
    },
    dataIsbtngroup(newVal) {
      this.isBtnGroup = newVal
    },
    dataIsrequired(newVal) {
      if (newVal) {
        this.validateForm()
      }
    },
    bankInfo(newVal) {
      if (newVal !== null) {
        this.formList.forEach(item => {
          if (item.type === 'selectInput' && this.dataOperationtype !== 2) {
            this.form.bankCode = item.options[newVal].code
            this.form.bankName = item.options[newVal].value
          }
        })
      }
    },
    dataBankindex(newVal) {
      this.bankInfo = newVal
    }
  },
  created() {
    this.form = this.formObj()
  },
  mounted() {
    this.$nextTick(() => {
      this.iptChange()
    })
  },
  methods: {
    // 创建form对象，用于返回父级
    formObj() {
      if (this.dataSetting.list) {
        const form = {}
        this.dataSetting.list.forEach(item => {
          form[item.key] = item.value
          if (item.key === 'coverAreaList' && this.dataOperationtype === 3) {
            console.log(111, item)
            this.selAreaFun(item)
          }
        })
        // 编辑数据回显
        if (this.dataOperationtype === 3 || this.dataOperationtype === 2) {
          if (form.region !== undefined) {
            this.cityChange(form)
          }
        }
        return form
      }
    },
    // 创建校验对象
    createRules() {
      if (this.dataOperationtype === 2) return {}
      if (this.dataSetting.list) {
        const rules = {}
        this.dataSetting.list.forEach(item => {
          if (item.isRequired) {
            rules[item.key] = []
            switch (item.validate) {
              case 'mobile':
                rules[item.key].push({ required: true, validator: this.validatePhone(), trigger: 'blur' })
                break
              case 'email':
                rules[item.key].push({ required: true, validator: this.checkEmail(), trigger: 'blur' })
                break
              case 'select':
                rules[item.key].push({ required: true, message: item.placeholder, trigger: 'change' })
                break
              case 'greaterZero':
                rules[item.key].push({ required: true, validator: this.greaterZero(), trigger: 'change' })
                break
              default:
                rules[item.key].push({ required: true, message: item.placeholder, trigger: 'blur' })
                break
            }
          }
        })
        return rules
      }
    },
    // 验证手机号
    validatePhone() {
      return (rule, value, callback) => {
        if (!value) return callback(new Error('请输入手机号/电话'))
        var pattern = /^1[3|4|5|6|7|8|9]\d{9}$/
        var pattern1 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
        pattern.test(value) || pattern1.test(value) ? callback() : callback(new Error('请输入正确的手机号/电话'))
      }
    },
    // 验证邮箱
    checkEmail() {
      return (rule, value, callback) => {
        if (!value) return callback(new Error('请输入邮箱'))
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        mailReg.test(value) ? callback() : callback(new Error('请输入正确的邮箱格式'))
      }
    },
    // 判断大于0
    greaterZero() {
      return (rule, value, callback) => {
        if (!value && value !== 0) return callback(new Error('当前输入框不能为空'))
        setTimeout(() => {
          if (!/^[0-9]+$/.test(value)) {
            callback(new Error('请输入整数并且不能是负数'))
          } else {
            callback()
          }
        }, 500)
      }
    },
    // city change event
    async cityChange(form) {
      // 所在区域数据处理
      if (form) {
        this.form = form
      }
      const supplier = this.form
      const [proviceName, cityName] = await this.getNameByCode(supplier.region) // 供应商所在区域
      supplier.proviceCode = supplier.region[0]
      supplier.cityCode = supplier.region[1]
      supplier.proviceName = proviceName
      supplier.cityName = cityName
    },
    // 新增供应商选择所在区域&&服务商事件
    async changeBindData(type, row) {
      if (type === 'city') {
        await this.cityChange()
      }
      if (type === 'cityMultiple') {
        await this.selAreaFun(row)
      }
      this.iptChange()
    },
    // 表单验证
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('isSubmit', true)
        } else {
          this.$emit('isSubmit', false)
        }
      })
    },
    // 父级通讯
    save() {
      this.$emit('save', true)
    },
    goBack() {
      this.$router.go(-1)
    },
    // 通过省份/城市code查询名字
    getNameByCode(ary = []) {
      const cityList = []
      const res = []
      const province = cityList.find(item => {
        return item.code === ary[0]
      })
      const city = province.children.find(item => {
        return item.code === ary[1]
      })
      const cityName = city ? city.name : ''
      res.push(province.name)
      res.push(cityName)
      return res
    },
    // 取消事件
    cancel() {
      this.$router.go(-1)
    },
    // 省市多选change事件
    selAreaFun(row) {
      const proviceCodeList = new Set()
      const cityCodeList = new Set()
      const areaCodeList = new Set()
      if (this.form[row.key] === undefined) {
        this.form[row.key] = row.value
      }
      this.form[row.key].forEach(item => {
        proviceCodeList.add(item[0])
        cityCodeList.add(item[1])
        if (item.length > 2) {
          areaCodeList.add(item[2])
        }
      })
      return this.repetitionFilter(row.options, Array.from(proviceCodeList), Array.from(cityCodeList))
    },
    // 省市去重
    repetitionFilter(options, proviceCode, cityCode) {
      const buffProviceCode = Object.assign([], proviceCode)
      const buffCityCode = Object.assign([], cityCode)
      buffProviceCode.forEach(item => {
        let len = 0 // 获取options里该省份下市的长度
        options.forEach(ele => {
          if (ele.code === item) {
            len = ele.children.length
          }
        })
        let sum = 0 // 获取市code列表中以省code开头的总数
        buffCityCode.forEach(ele => {
          if (ele.startsWith(item)) {
            sum += 1
          }
        })
        if (len === sum) { // 为真说明全选，剔除市code
          cityCode = cityCode.filter(ele => !ele.startsWith(item))
        } else { // 剔除省code
          console.log('剔除省code', typeof item, proviceCode)
          proviceCode = proviceCode.filter(ele => ele !== item)
          console.log(proviceCode)
        }
      })
      this.form.proviceCodeList = proviceCode
      this.form.cityCodeList = cityCode
      console.log('proviceCodeList', this.form)
    },
    // 数据双向绑定change事件
    iptChange() {
      this.$emit('input', this.form)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.layout
  padding: $padding-size-middle-x

  .tabHeader
    position: fixed
    width: 150px
    height: 200px
    background: #fff
    top: 100px
    right: 20px
    z-index: 2

    .list
      position: absolute
      width: 100%
      height: 40px
      left: 0px
      padding-left: 20px

      &.active, &:hover
        color: #006072

.subTitle
  line-height: 30px
  margin-bottom: 10px
  color: #ccc
  border-top: 1px solid #ccc

.viewInfo
  min-height: 40px
  margin-right: 20px
  display: block
  color: #333
  line-height: 22px
  font-weight: 400
  word-wrap: break-word

.infoList
  padding-bottom: 10px

.operationing
  color: #006072

.formView /deep/
  .el-form-item__label
    line-height: 22px

.back
  position: relative
  left: -20px
  width: calc(100% + 20px)
  height: 60px
  background: rgba(255, 255, 255, 1)
  text-align: center
  color: #006072
  font-size: 16px
  line-height: 40px
  cursor: pointer
  border-top: 20px solid #f8f9fa
</style>
