---
title: 'Form'
---
# Form 表单
#### 使用方法
::: tip
1.引入组件，注册组件  
2.传递数据，及显示方式  
- `:data-setting="data"`(传递数据[**Object**])  
- `:data-operationtype="1"`(操作类型：1 新增 2 查看 3 编辑[**Number**])  

3.组件会自动生成form数据对象，通过`v-model`接收([**Object**])  
4.表单提交前校验，通过`:data-isrequired="isBaseRequired"`通知组件自动校验([**Boolean**])
:::
## input
<FormView :data-setting="data" :data-operationtype="1" />
```html
<FormView :data-setting="data" :data-operationtype="1" />
```
```js
export default {
  data() {
    return {
      data: {
        list: [
          { 
            label: '供应商名称', // label名称
            key: 'supplierName', // 组件自动生成form表单的key
            value: '', // 输入的value
            type: 'input', // input的类型
            placeholder: '请输入供应商名称', // placeholder提示信息及校验提示内容
            isRequired: true // 是否需要校验
          }
        ]
      }
    }
  }
}
```

## select
<FormView :data-setting="data1" :data-operationtype="1" />
```html
<FormView :data-setting="data" :data-operationtype="1" />
```
```js
export default {
  data() {
    return {
      data: {
        list: [
          { 
            label: '供应商状态', // label名称
            key: 'supplierStatus', // 组件自动生成form表单的key
            value: null, // 输入的value
            type: 'select', // input的类型
            placeholder: '请选择供应商状态', // placeholder提示信息及校验提示内容
            validate: 'select',
            options: [ // 选项数据
              { label: '是', value: 1 },
              { label: '否', value: 0 },
            ],
            isRequired: true // 是否需要校验
          }
        ]
      }
    }
  }
}
```

## radio

<FormView :data-setting="data4" :data-operationtype="1" />
```html
<FormView :data-setting="data" :data-operationtype="1" />
```
```js
export default {
  data() {
    return {
      data: {
        list: [
          {
            label: '区域供应商', // label名称
            key: 'isRegional', // 组件自动生成form表单的key
            value: 1, // 输入的value
            type: 'radio', // input的类型
            placeholder: '请选择区域供应商', // placeholder提示信息及校验提示内容
            options: [ // 选项数据
              { label: '是', value: 1 },
              { label: '否', value: 0 },
            ],
            isRequired: true // 是否需要校验
          }
        ]
      }
    }
  }
}
```

## region
<FormView :data-setting="data2" :data-operationtype="1" />
```html
<FormView :data-setting="data" :data-operationtype="1" />
```
```js
export default {
  data() {
    return {
      data: {
        list: [
          {
            label: '供应商所在区域', // label名称
            key: 'region', // 组件自动生成form表单的key
            value: [], // 输入的value
            type: 'region', // input的类型
            placeholder: '请输选择商所在区域', // placeholder提示信息及校验提示内容
            validate: 'select', // 校验方式
            options: [ // 选项数据
              { label: '是', value: 1 },
              { label: '否', value: 0 },
            ],
            isRequired: true // 是否需要校验
          }
        ]
      }
    }
  }
}
```

## slot使用
<FormView :data-setting="data2" :data-operationtype="1">
  <div slot="header" class="item-warp">
    基础信息
  </div>
</FormView>

```html
<FormView :data-setting="data" :data-operationtype="1">
  <div slot="header" class="item-warp">
    基础信息
  </div>
</FormView>
```

## 显示操作
<FormView :data-setting="data3" :data-operationtype="2">
  <div slot="header" class="item-warp">
    基础信息
  </div>
</FormView>

```html
<FormView :data-setting="data" :data-operationtype="2">
  <div slot="header" class="item-warp">
    基础信息
  </div>
</FormView>
```
```js
export default {
  data() {
    return {
      data: {
        list: [
          { 
            label: '供应商名称', // label名称
            key: 'supplierName', // 组件自动生成form表单的key
            value: 'xxx供应商', // 输入的value
            type: 'input', // input的类型
            placeholder: '请输入供应商名称', // placeholder提示信息及校验提示内容
            isRequired: true // 是否需要校验
          }
        ]
      }
    }
  }
}
```
#### props
键                | 描述                    |  默认值   
:----------       |:---------              |:----------
dataSetting       | 生成表单基础数据          | 无 
dataIsbtngroup    | 是否显示确认、取消按钮     | false
dataIsrequired    | 是否进行校验操作          | false
dataOperationtype | 操作状态1创建 2查看 3编辑  | false
dataBankindex     | 开户行数据回显下标        | 无

#### 事件
事件              | 描述                    
:----------      |:---------              
isSubmit         | 接收校验结果，判断是否保存  
save             | 接收保存按钮事件通讯       

#### dataSetting
键            | 描述                    |  默认值   
:----------   |:---------              |:----------
label         | 标题                    | 无
key           | 生成form的key           | 无
value         | 回现或展示数据            | 无
type          | input类型               | input、number、radio、region、cityMultiple、select、selectInput
placeholder   | placeholder及校验提示信息 | 无
validate      | 校验类型及规则            | input(默认blue) mobile(手机校验) email(邮箱校验) select(change) 
options       | 下拉框、单选、多选枚举值    | 无
isRequired    | 是否校验                 | 否
width         | 设置输入框宽度            | 434px

<script>
import FormView from '../../docs/.vuepress/common/components/Form'
export default {
  data () {
    return {
      data: {
        list: [
          { label: '供应商名称', key: 'supplierName', value: '', type: 'input', placeholder: '请输入供应商名称', isRequired: true }
        ]
      },
      data1: {
        list: [
          { label: '供应商状态', key: 'supplierStatus', value: '', type: 'select', placeholder: '请选择供应商状态', isRequired: true, validate: 'select', options: [{ label: '是', value: 1 }, { label: '否', value: 0 },] }
        ]
      },
      data2: {
        list: [
          { label: '供应商所在区域', key: 'region', value: [], type: 'region', placeholder: '请输选择商所在区域', isRequired: true, options: [], validate: 'select' },
        ]
      },
      data3: {
        list: [
          { label: '供应商名称', key: 'supplierName', value: 'xxx供应商', type: 'input', placeholder: '请输入供应商名称', isRequired: true }
        ]
      },
      data4: {
        list: [
          { label: '区域供应商', key: 'isRegional', value: 1, type: 'radio', placeholder: '请选择区域供应商', isRequired: true, options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ]}
        ]
      }
    }
  },
  components: {
    FormView
  },
  methods: {
    
  }
}
</script>
<style scoped>
  .item-warp {
    min-height: 52px;
    color: #ccc;
    padding-top: 18px;
    margin-bottom: 6px;
  }
  h2{
    margin-bottom: 20px!important;
  }
</style>