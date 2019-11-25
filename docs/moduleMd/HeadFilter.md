---
title: 'HeadFilter'
---
# HeadFilter 头部筛选
#### 使用方法
::: tip
1.引入组件，注册组件 `import HadeFilter from '@/common/components/HeadFilter'`  
2.传递数据  
- `:data-setting="data"`(传递数据[**Array**])  
- `:input-group="22"`(左侧表单所占盒子比例[**number**])
- `:input-col-size="3"`(一行显示input个数[**number**])
- `:btn-group="2"`(右侧查询按钮所占盒子比例[**number**])  
- `:label-width="70"` (label制定宽度[**number**])  
- `:btn-group-flex="end"` (控制查询按钮对其方式，参数：end, start，默认end[**string**])  

3.组件会自动生成form数据对象，通过`v-model`接收([**Object**])  
4.接收子组件查询按钮的通讯  
- `@query="onQuery"`
:::
#### 案例：
<HeadFilter
  v-model="queryCondition"
  :input-group="21"
  :btn-group="3"
  :input-col-size="2"
  :data-setting="queryConditionList"
  @query="onQuery"
/>
```html
<HeadFilter
  v-model="queryCondition"
  :input-group="21"
  :btn-group="3"
  :input-col-size="2"
  :data-setting="queryConditionList"
  @query="onQuery"
/>
```
```js
<script>
export default {
  data () {
    return {
      queryConditionList: [
        { label: '酒店编号/名称', type: 'input', key: 'a', value: '' },
        {
          label: '审核状态',
          type: 'select',
          key: 'b',
          value: '',
          options: [
            { label: '待审核', value: 2 },
            { label: '审批通过', value: 3 },
            { label: '审批驳回', value: 4 }
          ]
        }
      ],
      queryCondition: {}
    }
  },
  methods: {
    onQuery(bool) {
      if (!bool) return
      console.log(bool)
      console.log(this.queryCondition) // { a: '', b: '' }
    }
  }
}
</script>
```
#### dataSetting
键            | 描述                         |  默认值   
:----------   |:---------                   |:----------
label         | 标题                        | 无
key           | 生成form的key，用于返回给父组件 | 无
value         | 回现或展示数据                | 无
type          | input类型                   | input、select
placeholder   | placeholder提示信息          | 请选择 or 无
disabled      | 是否禁用                     | false
options       | 下拉框、单选、多选枚举值        | 无

#### 事件
事件               | 描述           
:----------       |:---------     
query             | 接收查询点击事件 

<script>
import HeadFilter from '../../docs/.vuepress/common/components/HeadFilter'
export default {
  data () {
    return {
      queryConditionList: [
        { label: '酒店编号/名称', type: 'input', key: 'b', value: '' },
        {
          label: '审核状态',
          type: 'select',
          key: 'c',
          value: '',
          options: [
            { label: '待审核', value: 2 },
            { label: '审批通过', value: 3 },
            { label: '审批驳回', value: 4 }
          ]
        }
      ],
      queryCondition: {}
    }
  },
  components: {
    HeadFilter
  },
  methods: {
    onQuery(bool) {
      if (!bool) return
      console.log(bool)
      console.log(this.queryCondition)
    }
  }
}
</script>
