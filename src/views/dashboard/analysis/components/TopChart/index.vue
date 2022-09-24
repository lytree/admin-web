<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:16">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div class="flex w-full h-360px">
          <div class="w-200px h-full py-12px">
            <h3 class="text-16px font-bold">Dashboard</h3>
            <p class="text-[#aaa]">Overview Of Lasted Month</p>
            <h3 class="pt-36px text-24px font-bold">
              <count-to prefix="$" :start-value="0" :end-value="7754" />
            </h3>
            <p class="text-[#aaa]">Current Month Earnings</p>
            <h3 class="pt-36px text-24px font-bold">
              <count-to :start-value="0" :end-value="1234" />
            </h3>
            <p class="text-[#aaa]">Current Month Sales</p>
            <n-button class="mt-24px" type="primary">Last Month Summary</n-button>
          </div>
          <div class="flex-1-hidden h-full">
            <div ref="lineRef" class="wh-full"></div>
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:8">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div ref="pieRef" class="w-full h-360px"></div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">



</script>

<style scoped></style>
