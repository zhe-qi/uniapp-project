<script setup lang="ts">
import { RequestApi } from '@/utils/request'

const check = ref<boolean>(false)
const login = () => {
  if (check.value) {
    uni.getUserProfile({
      desc: '获取个人信息',
      success: (res) => {
        let { avatarUrl, nickName } = res.userInfo
        // 获取code
        uni.login({
          success: (code) => {
            uni.showLoading({ title: '登陆中', mask: true })
            ApiLogin(avatarUrl, nickName, code.code)
          },
          fail: (err) => {
            uni.showToast({ title: err, icon: 'none', duration: 1000 })
          }
        })
      },
      fail: (err) => {
        uni.showToast({ title: err, icon: 'none', duration: 1000 })
      }
    })
  } else {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none'
    })
  }
}

// 调用api接口登陆
async function ApiLogin(avatarUrl: string, nickName: string, code: string) {
  try {
    let obj = {
      appid: '',
      secret: '',
      avatarUrl,
      nickName,
      code
    }
    let res: any = await RequestApi.WxLogin(obj)
    // 存储用户信息到本地缓存，然后返回上一页
    uni.setStorageSync('wxuser', res.data)
    setTimeout(() => {
      uni.navigateBack({ delta: 1 })
    }, 600)
  } catch (error) {
    uni.showToast({ title: '登录失败', icon: 'none', duration: 1000 })
  }
}
</script>

<template>
  <view class="Login-page">
    <image
      mode="aspectFill"
      src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg"
    />
    <button @click="login">授权登陆</button>
    <checkbox-group
      class="change"
      @change="check = !check"
    >
      <label>
        <checkbox
          :value="true"
          :checked="check"
        />点击同意代表您已阅读并遵守<text class="user">《用户使用协议》</text>
      </label>
    </checkbox-group>
  </view>
</template>

<style scoped>
.Login-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.Login-page image {
  width: 100%;
  height: 100%;
}
.Login-page button {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 30%;
  background-color: #2c76ef;
  color: #ffffff;
  padding: 0 100rpx;
  font-size: 35rpx;
}

.change {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 10%;
  width: 80%;
  height: 100rpx;
  text-align: center;
  font-size: 23rpx;
}
.user {
  color: #2c76ef;
  text-decoration: underline;
}
</style>
