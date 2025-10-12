# TDesign 图标使用指南

## 📋 概述

TDesign 提供了丰富的图标库，包含 **2,124 个图标**，可以在微信小程序中直接使用。项目已安装 `tdesign-miniprogram@1.10.1`。

## 🎯 常用图标列表

### 导航类图标
- `home` - 首页
- `search` - 搜索  
- `setting` - 设置
- `notification` - 通知
- `message` - 消息
- `chevron-left` - 左箭头
- `chevron-right` - 右箭头
- `arrow-left` - 返回
- `close` - 关闭
- `check` - 确认

### 用户类图标
- `user` - 用户
- `user-circle` - 用户圆形
- `user-add` - 添加用户
- `contacts` - 联系人
- `group` - 群组
- `avatar` - 头像
- `profile` - 个人资料
- `account` - 账户

### 应用类图标
- `app` - 应用
- `apps` - 应用集合
- `grid` - 网格
- `menu` - 菜单
- `more` - 更多
- `tools` - 工具
- `component` - 组件
- `plugin` - 插件

### 功能类图标
- `heart` - 收藏
- `star` - 星标
- `add` - 添加
- `edit` - 编辑
- `delete` - 删除
- `download` - 下载
- `upload` - 上传
- `share` - 分享

## 💻 使用方法

### 1. 基本用法
```vue
<template>
  <!-- 基本图标 -->
  <t-icon name="home" />
  
  <!-- 指定大小 -->
  <t-icon name="user" size="40rpx" />
  
  <!-- 指定颜色 -->
  <t-icon name="heart" color="#ff4757" />
  
  <!-- 组合使用 -->
  <t-icon name="search" size="32rpx" color="#0052D9" />
</template>
```

### 2. 在标签栏中使用
```vue
<template>
  <t-tab-bar>
    <t-tab-bar-item>
      <template #icon>
        <t-icon name="home" />
      </template>
      <text>首页</text>
    </t-tab-bar-item>
    
    <t-tab-bar-item>
      <template #icon>
        <t-icon name="user" />
      </template>
      <text>我的</text>
    </t-tab-bar-item>
  </t-tab-bar>
</template>
```

### 3. 动态图标
```vue
<template>
  <t-icon :name="currentIcon" :color="iconColor" />
</template>

<script>
export default {
  data() {
    return {
      currentIcon: 'home',
      iconColor: '#0052D9'
    }
  },
  methods: {
    changeIcon() {
      this.currentIcon = this.currentIcon === 'home' ? 'user' : 'home'
    }
  }
}
</script>
```

## 🎨 图标属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | String | - | 图标名称（必填） |
| size | String | '24rpx' | 图标大小 |
| color | String | - | 图标颜色 |
| customStyle | String | - | 自定义样式 |

## 🔍 查找更多图标

1. **官方图标库**：访问 [Yesicon](https://yesicon.app/tdesign?lang=zh-hans) 浏览所有可用图标
2. **GitHub仓库**：查看 [TDesign Icons](https://github.com/Tencent/tdesign-icons) 获取最新图标
3. **文档**：参考 [TDesign 官方文档](https://tdesign.tencent.com/miniprogram/overview)

## ⚠️ 注意事项

1. **图标名称**：必须与TDesign内置图标名称完全匹配
2. **大小单位**：建议使用 `rpx` 单位以确保在不同设备上的适配
3. **颜色格式**：支持十六进制颜色值（如 `#0052D9`）
4. **兼容性**：TDesign图标在微信小程序中有良好的兼容性

## 🚀 推荐配置

### 标签栏图标推荐
```javascript
// 推荐的标签栏图标配置
const tabBarIcons = [
  { name: 'home', text: '首页' },
  { name: 'contacts', text: '联系人' },
  { name: 'tools', text: '工具' },
  { name: 'user-circle', text: '我的' }
]
```

### 常用功能图标
```javascript
// 常用功能图标
const functionIcons = {
  search: 'search',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  share: 'share',
  download: 'download',
  setting: 'setting',
  notification: 'notification'
}
```

## 📱 实际应用示例

项目中的 `pages/apps/index.vue` 页面已经更新为图标展示页面，展示了TDesign中可用的各种图标，可以作为参考使用。
