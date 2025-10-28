<template>
  <view class="container">
    <view class="auth-header">
      <text class="auth-title">身份认证</text>
      <text class="auth-subtitle">完善个人信息，享受更多服务</text>
    </view>

    <view class="auth-form">
      <view class="form-group">
        <text class="form-label">真实姓名</text>
        <input 
          class="form-input" 
          v-model="authForm.realName" 
          placeholder="请输入真实姓名"
          maxlength="10"
        />
      </view>

      <view class="form-group">
        <text class="form-label">身份证号</text>
        <input 
          class="form-input" 
          v-model="authForm.idCard" 
          placeholder="请输入身份证号"
          maxlength="18"
        />
      </view>

      <view class="form-group">
        <text class="form-label">手机号码</text>
        <input 
          class="form-input" 
          v-model="authForm.phone" 
          placeholder="请输入手机号码"
          maxlength="11"
          type="number"
        />
      </view>

      <view class="form-group">
        <text class="form-label">验证码</text>
        <view class="code-input-group">
          <input 
            class="form-input code-input" 
            v-model="authForm.verifyCode" 
            placeholder="请输入验证码"
            maxlength="6"
            type="number"
          />
          <button 
            class="code-btn" 
            :disabled="codeCountdown > 0"
            @click="sendVerifyCode"
          >
            {{ codeCountdown > 0 ? `${codeCountdown}s` : '获取验证码' }}
          </button>
        </view>
      </view>

      <view class="form-group">
        <text class="form-label">钓鱼经验</text>
        <picker 
          :value="experienceIndex" 
          :range="experienceOptions" 
          @change="onExperienceChange"
        >
          <view class="picker-input">
            <text class="picker-text">{{ experienceOptions[experienceIndex] }}</text>
            <text class="picker-arrow">></text>
          </view>
        </picker>
      </view>

      <view class="form-group">
        <text class="form-label">常去钓点</text>
        <input 
          class="form-input" 
          v-model="authForm.fishingSpot" 
          placeholder="请输入常去的钓点"
          maxlength="20"
        />
      </view>
    </view>

    <view class="auth-tips">
      <view class="tip-item">
        <text class="tip-icon">🔒</text>
        <text class="tip-text">您的个人信息将被严格保护</text>
      </view>
      <view class="tip-item">
        <text class="tip-icon">✅</text>
        <text class="tip-text">认证后可享受更多钓鱼资讯</text>
      </view>
    </view>

    <button 
      class="submit-btn" 
      :disabled="!canSubmit"
      @click="submitAuth"
    >
      <text class="btn-text">提交认证</text>
    </button>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 表单数据
const authForm = ref({
  realName: '',
  idCard: '',
  phone: '',
  verifyCode: '',
  fishingSpot: ''
})

// 钓鱼经验选项
const experienceOptions = ['新手', '1-3年', '3-5年', '5-10年', '10年以上']
const experienceIndex = ref(0)

// 验证码倒计时
const codeCountdown = ref(0)

// 是否可以提交
const canSubmit = computed(() => {
  return authForm.value.realName && 
         authForm.value.idCard && 
         authForm.value.phone && 
         authForm.value.verifyCode &&
         authForm.value.fishingSpot
})

// 发送验证码
const sendVerifyCode = () => {
  if (!authForm.value.phone) {
    uni.showToast({
      title: '请先输入手机号',
      icon: 'none'
    })
    return
  }

  if (!/^1[3-9]\d{9}$/.test(authForm.value.phone)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  // 模拟发送验证码
  uni.showLoading({
    title: '发送中...'
  })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
    
    // 开始倒计时
    codeCountdown.value = 60
    const timer = setInterval(() => {
      codeCountdown.value--
      if (codeCountdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }, 1000)
}

// 钓鱼经验选择
const onExperienceChange = (e) => {
  experienceIndex.value = e.detail.value
}

// 提交认证
const submitAuth = () => {
  // 验证身份证号格式
  if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(authForm.value.idCard)) {
    uni.showToast({
      title: '请输入正确的身份证号',
      icon: 'none'
    })
    return
  }

  uni.showLoading({
    title: '提交中...'
  })

  // 模拟提交认证
  setTimeout(() => {
    uni.hideLoading()
    uni.showModal({
      title: '认证成功',
      content: '恭喜您完成身份认证，现在可以享受更多服务了！',
      showCancel: false,
      success: () => {
        // 保存认证信息
        const authInfo = {
          ...authForm.value,
          experience: experienceOptions[experienceIndex.value],
          authTime: new Date().toISOString(),
          isAuthenticated: true
        }
        
        uni.setStorageSync('authInfo', authInfo)
        
        // 返回上一页
        uni.navigateBack()
      }
    })
  }, 2000)
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
}

.auth-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.auth-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 12rpx;
}

.auth-subtitle {
  font-size: 24rpx;
  color: #666666;
}

.auth-form {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #e5e5e5;
}

.form-group {
  margin-bottom: 30rpx;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 28rpx;
  color: #333333;
  font-weight: 600;
  display: block;
  margin-bottom: 12rpx;
}

.form-input {
  width: 100%;
  background: #f8f8f8;
  border: 1rpx solid #e5e5e5;
  border-radius: 8rpx;
  padding: 24rpx;
  font-size: 28rpx;
  color: #333333;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #07c160;
  background: #ffffff;
}

.code-input-group {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.code-input {
  flex: 1;
}

.code-btn {
  background: #07c160;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 24rpx 20rpx;
  font-size: 24rpx;
  white-space: nowrap;
}

.code-btn:disabled {
  background: #cccccc;
  color: #999999;
}

.picker-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f8f8;
  border: 1rpx solid #e5e5e5;
  border-radius: 8rpx;
  padding: 24rpx;
}

.picker-text {
  font-size: 28rpx;
  color: #333333;
}

.picker-arrow {
  font-size: 24rpx;
  color: #999999;
}

.auth-tips {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #e5e5e5;
}

.tip-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #666666;
}

.submit-btn {
  width: 100%;
  background: #07c160;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 28rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.submit-btn:disabled {
  background: #cccccc;
  color: #999999;
}

.btn-text {
  color: inherit;
}
</style>
