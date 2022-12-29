<template>
  <view class="skeleton-view">
    <view
      class="skeleton-global skeleton-top"
      :style="{ height:menu_height, marginTop: menu_top }"
    />
    <view class="skeleton-global skeleton-img" />
    <view class="vaccine">
      <text
        v-for="item in YIMIAO"
        :key="item"
        class="skeleton-global"
      />
    </view>
    <view class="vaccine phy">
      <text
        v-for="item in YIMIAO.slice(0, 2)"
        :key="item"
        class="skeleton-global"
      />
    </view>
    <view class="vaccine regist">
      <text
        v-for="item in GUAHAO"
        :key="item"
        class="skeleton-global"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menuButtonInfoKey } from '@/@types/menuButtonInfo'
// 取出胶囊按钮数据
let menu_top = ref('')
let menu_height = ref('')
let MenuButton = inject(menuButtonInfoKey)?.value ?? { top: 0, height: 0 }
menu_top.value = MenuButton.top + 'px'
menu_height.value = MenuButton.height + 'px'
// 遍历无数据
let YIMIAO = ref(['', '', '', ''])
let GUAHAO = ref(['', '', '', '', '', '', '', '', ''])
</script>

<style scoped>
.skeleton-top {
  width: 400rpx;
  margin-left: 20rpx;
}
.skeleton-img {
  height: 300rpx;
  margin: 20rpx;
}
.vaccine {
  display: flex;
  justify-content: space-between;
}
.vaccine text {
  width: 25%;
  margin: 20rpx;
  box-sizing: border-box;
  height: 100rpx;
}
.phy text {
  width: 50% !important;
  height: 200rpx;
}
.regist {
  flex-wrap: wrap;
}
.regist text {
  width: calc(33% - 20rpx * 2);
  margin: 20rpx;
}
</style>
