<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import {RequestApi} from '@/utils/request'
import {Hpvorder} from '@/@types/frontPage'
// 获取订单数据
let order = ref<Hpvorder[]>([])
let show = ref(false)
onShow(async()=>{
  const res = await RequestApi.HpvuserOrder() as {data:[]}
  order.value = res.data
  if(res.data.length == 0){
    show.value = true
  }
})
// 取消预约
async function Cancel(id:string,index:number){
  const res = await RequestApi.HpvCancel({_id:id}) as {statusCode:number}
  if(res.statusCode == 200){
    order.value[index].cancel = false
  }
}
</script>

<template>
  <view
    v-for="(item, index) in order"
    :key="index"
    class="xinguan-view"
  >
    <text class="name">{{ item.hpv_name }}</text>
    <view class="xinguan-order">
      <text>接种人:</text>
      <text>{{ item.name }}</text>
    </view>
    <view class="xinguan-order">
      <text>接种地点:</text>
      <text>{{ item.address }}</text>
    </view>
    <view class="xinguan-order">
      <text>疫苗套餐:</text>
      <text>{{ item.combo }} {{ item.ino_time }}</text>
    </view>
    <view class="xinguan-order">
      <text>订单编号:</text>
      <text>{{ item.order_number }}</text>
    </view>
    <view class="reg-price"><text>¥{{ item.price }}</text></view>
    <!-- 取消预约 -->
    <view class="reg-cancel">
      <text
        :class="item.cancel ? '' : 'prevent_style'"
        @click="Cancel(item._id,index)"
      >
        {{ item.cancel ? '取消预约' : '已取消预约' }}
      </text>
    </view>
  </view>
  <!-- 提示组件 -->
  <Point :show="show" />
  <view style="height:200rpx" />
</template>

<style scoped>
@import url('@/static/common-style/vaccine.css');
</style>