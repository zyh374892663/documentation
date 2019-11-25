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
                  <span class="left_label">{{ item.label }}</span>
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
            <div class="tab-list-item btn-group">
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './tab-header'

.left_label
  flex: 1 !important

.btn-group
  display: flex
  justify-content: flex-end

.el-button
  padding: 0 20px
</style>
