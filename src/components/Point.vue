<!-- 公用的提示 -->
<script setup lang="ts">
withDefaults(defineProps<{show:boolean,title?:string}>(),{
  show:false,
  title:'你还没有订单数据'
})
</script>

<template>
  <view
    v-if="show"
    class="point"
  >
    <image
      src="/static/other/kongshuju.jpg"
      mode="widthFix"
    />
    <text>{{ title }}</text>
  </view>
</template>


<style scoped>
.point{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
  color: #858585;
}
.point image{
  display: block;
  width: 230rpx;
  height: 230rpx;
}
</style>