<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { information, orderData } from '@/utils/testing'
// 获取用户信息
let user_data = ref({avatarUrl:'',nickName:''})
onShow(()=>{
  let wxUser = uni.getStorageSync('wxuser') as {avatarUrl:string,nickName:string}
  if(!wxUser){
    user_data.value.avatarUrl = ''
    user_data.value.nickName = ''
  }else{
    user_data.value.avatarUrl = wxUser.avatarUrl
    user_data.value.nickName = wxUser.nickName
  }
})
// 去登陆
function loGin(){
  uni.navigateTo({
    url:'/pages/login/login'
  })
}

// 订单跳转
function orderRoute(path:string){
  uni.navigateTo({
    url:path
  })
}
</script>

<template>
  <view class="user-name">
    <image
      :src="user_data.avatarUrl == '' ? '/static/other/touxiang.svg' : user_data.avatarUrl"
      mode="aspectFill"
    />
    <text
      :class="user_data.nickName == '' ? 'split-new' : 'disabled'"
      @click="loGin"
    >
      {{ user_data.nickName == '' ? '登陆' : user_data.nickName }}
    </text>
  </view>
  <view class="infor_mation">
    <view
      v-for="(item,index) in information"
      :key="index"
    >
      <text>{{ item.number }}</text>
      <text>{{ item.title }}</text>
    </view>
  </view>
  <view class="my-order">
    <view
      v-for="(item,index) in orderData"
      :key="index"
      @click="orderRoute(item.path)"
    >
      <image :src="item.icon" />
      <text>{{ item.title }}</text>
    </view>
  </view>
</template>

<style scoped>
  page{
      background: linear-gradient(to bottom,#e3efff 30%, #f6f6f6 40%);
  }
  /* 昵称 */
  .user-name{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 35rpx;
  }
  .user-name image{
    width: 80rpx;
    height: 80rpx;
    display: block;
    border-radius: 50%;
    border: 5rpx solid #ffffff;
    margin-bottom: 10rpx;
  }
  /* 三个排列 */
  .infor_mation view{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .infor_mation{
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    margin: 50rpx 0;
  }
  .infor_mation text{
    padding-bottom: 15rpx;
  }
  /* 我的订单 */
  .my-order{
    background-color: #ffffff;
    border-radius: 20rpx;
    margin: 0 20rpx 20rpx 20rpx;
    display: flex;
    flex-wrap: wrap;
    font-size: 28rpx;
  }
  .my-order image{
    width: 60rpx;
    height: 60rpx;
    margin-bottom: 25rpx;
  }
  .my-order view{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(25% - 20rpx*2);
    margin: 20rpx;
  }
  /* 未登陆的背景 */
  .split-new{
    background: #0176ff;
    color: #ffffff;
    border-radius: 10rpx;
    padding: 10rpx 50rpx;
  }
  /* 禁用点击 */
  .disabled{
    pointer-events: none;
  }
  </style>