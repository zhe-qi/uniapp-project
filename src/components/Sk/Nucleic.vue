<template>
  <view class="skeleton-view">
    <view class="skeleton-global sk-nucleic-top" />
    <view class="skeleton-global sk-nucleic-address" />
    <view
      v-for="item in INPUT"
      :key="item"
      class="skeleton-global sk-nucleic-input"
    />
    <view class="skeleton-global sk-nucleic-time" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let INPUT = ref(['', '', ''])
</script>

<style scoped>
.sk-nucleic-top {
  height: 250rpx;
}
.sk-nucleic-address {
  height: 200rpx;
  margin: 20rpx;
}
.sk-nucleic-input {
  height: 150rpx;
  margin: 20rpx;
}
.sk-nucleic-time {
  height: 250rpx;
  margin: 20rpx;
}
</style>
