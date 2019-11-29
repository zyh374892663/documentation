<template>
  <div class="headFilter">
    <div class="tab-head">
      <div class="tab-head-list">
        <el-row>
          <el-col :lg="$attrs['input-group']" :sm="$attrs['input-group'] - 1">
            <template>
              <el-col
                v-for="(item, i) in list"
                :key="i"
                :md="24 / $attrs['input-col-size']"
                :sm="12"
                :xs="12"
              >
                <div class="tab-list-item">
                  <span
                    :style="{'flex': ' 0 0 ' + ($attrs['label-width'] ? $attrs['label-width'] : 70) + 'px'}"
                    class="left_label"
                  >{{ item.label }}</span>
                  <!-- select -->
                  <el-select
                    v-if="item.type === 'select'"
                    v-model="form[item.key]"
                    clearable
                    collapse-tags
                    placeholder="请选择"
                    style="width:195px"
                    @change="onchange"
                  >
                    <el-option
                      v-for="ele in item.options"
                      :key="ele.value"
                      :label="ele.label"
                      :value="ele.value"
                    />
                  </el-select>
                  <!-- 日期选择器 -->
                  <el-date-picker
                    v-else-if="item.type === 'daterange'"
                    :picker-options="item.props.pickerOptions !== undefined ? item.props.pickerOptions : {}"
                    v-model="form[item.key]"
                    style="width:248px;flex:0 0 248px; "
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="onchange"
                  />
                  <!-- 战区 -->
                  <el-cascader
                    v-else-if="item.type === 'warZone'"
                    id="multiple_sty"
                    v-model="form[item.key]"
                    :options="item.options"
                    :props="item.props.options"
                    collapse-tags
                    clearable
                    filterable
                    style="width:195px"
                    @change="onchange"
                  />
                  <!-- input search -->
                  <el-autocomplete
                    v-else-if="item.type === 'inputSearch'"
                    v-model="form[item.key]"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    value-key="label"
                    class="inline-input"
                    placeholder="请输入"
                    @select="onchange"
                  />
                  <!-- input -->
                  <el-input
                    v-else
                    v-model="form[item.key]"
                    clearable
                    placeholder="请输入"
                    style="width:195px"
                    @change="onchange"
                  />
                </div>
              </el-col>
            </template>
          </el-col>
          <el-col :lg="$attrs['btn-group']" :sm="$attrs['btn-group'] + 1">
            <div
              :style="{justifyContent: 'flex-' + ($attrs['btn-group-flex'] === undefined ? 'end' : $attrs['btn-group-flex'])}"
              class="tab-list-item btn-group"
            >
              <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadFilter',
  props: {
    dataSetting: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {},
      list: []
    }
  },
  watch: {
    dataSetting(newVal, oldVal) {
      this.list = newVal
      this.form = this.createForm(newVal)
    },
    list(newVal, oldVal) {
      this.form = this.createForm(newVal)
    }
  },
  mounted() {
    this.list = this.dataSetting
  },
  methods: {
    // 生成form
    createForm(list) {
      const form = {}
      list.forEach(item => {
        form[item.key] = item.value
      })
      return form
    },
    // change事件触发向父级通信
    onchange() {
      this.$emit('input', this.form)
    },
    // 查询点击事件
    onQuery() {
      this.$emit('query', true)
    },
    // input search搜索
    querySearch(query, cb) {
      console.log(this.list)
      let remoteData = []
      this.list.forEach(item => {
        if (item.type === 'inputSearch') {
          remoteData = item.options
        }
      })
      const results = query
        ? remoteData.filter(this.createFilter(query))
        : remoteData
      cb(results) // 调用 callback 返回建议列表的数据
    },
    // 模糊查询数据过滤
    createFilter(queryString) {
      return item => {
        return item.label.indexOf(queryString) > -1 || item.value.indexOf(queryString) > -1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './tab-header'

.btn-group
  display: flex

.el-button
  padding: 0 16px
</style>
