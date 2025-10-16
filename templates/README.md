# 鱼塘名片模板

## 模板说明

本模板基于朝阳湖钓场名片设计，包含了完整的鱼塘名片样式和布局。

## 文件结构

- `pond-card-template.vue` - 鱼塘名片模板组件

## 使用方法

### 1. 导入模板组件

```vue
<template>
  <view>
    <PondCardTemplate :pond="pondData" />
  </view>
</template>

<script>
import PondCardTemplate from '@/templates/pond-card-template.vue'

export default {
  components: {
    PondCardTemplate
  },
  data() {
    return {
      pondData: {
        pondName: '朝阳湖钓场',
        location: '朝阳区某某路123号',
        distance: '距离2.5km',
        infoType: '正钓',
        infoStatus: '报名中',
        fishSpecies: '鲤鱼',
        fishQuantity: '5000斤',
        fee: '50元/4小时',
        returnPrice: '4元/斤',
        spots: '50',
        time: '星期六上午8点',
        pondImage: '/static/logo.png',
        champion: '钓友老李 68斤',
        message: '今天鱼情不错，大家快来！'
      }
    }
  }
}
</script>
```

### 2. 数据格式

模板需要传入一个 `pond` 对象，包含以下字段：

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| pondName | String | 鱼塘名称 | "朝阳湖钓场" |
| location | String | 地址 | "朝阳区某某路123号" |
| distance | String | 距离 | "距离2.5km" |
| infoType | String | 信息类型 | "正钓" |
| infoStatus | String | 状态 | "报名中" |
| fishSpecies | String | 鱼种 | "鲤鱼" |
| fishQuantity | String | 数量 | "5000斤" |
| fee | String | 钓费 | "50元/4小时" |
| returnPrice | String | 回鱼价格 | "4元/斤" |
| spots | String | 钓位数 | "50" |
| time | String | 时间 | "星期六上午8点" |
| pondImage | String | 鱼塘图片 | "/static/logo.png" |
| champion | String | 坑冠信息 | "钓友老李 68斤" |
| message | String | 留言 | "今天鱼情不错，大家快来！" |

## 设计特色

### 🎨 视觉设计
- **浅色背景**：`#fafbfc` 提供柔和的视觉体验
- **圆角设计**：16rpx 圆角，现代化外观
- **阴影效果**：轻微阴影增加层次感
- **渐变文字**：报名中文字使用绿色渐变效果

### 📱 布局结构
- **头部区域**：鱼塘名称 + 地址 + 正钓/报名中
- **信息区域**：3行核心信息（鱼种、钓费、钓位数等）
- **底部区域**：150rpx图片 + 坑冠和留言

### 🎯 字体层次
- **鱼塘名字**：36rpx，颜色 #e74c3c（红色）
- **地址**：26rpx，颜色 #666
- **正钓**：36rpx，颜色 #e74c3c（红色）
- **报名中**：26rpx，艺术字体效果
- **详细信息**：26rpx，颜色 #666
- **坑冠/留言**：24rpx

### 📏 间距规范
- **标准行间距**：12rpx
- **卡片内边距**：24rpx（左右），0rpx（上下）
- **信息区域间距**：12rpx
- **图片尺寸**：150rpx × 150rpx

### 📱 响应式设计
- **小屏幕适配**：≤750rpx 时自动调整字体大小和间距
- **图片缩放**：小屏幕下图片尺寸调整为 120rpx
- **字体缩放**：各元素字体大小相应减小

## 自定义样式

如需修改样式，可以：

1. **修改颜色**：调整 CSS 变量或直接修改颜色值
2. **调整尺寸**：修改 padding、margin、font-size 等
3. **更改布局**：调整 flex 布局或添加新的布局元素

## 注意事项

1. 确保传入的数据格式正确
2. 图片路径需要正确设置
3. 响应式设计已内置，无需额外处理
4. 样式已使用 scoped，不会影响其他组件

## 更新记录

- 2024-01-XX: 创建初始模板
- 版本: v1.0
