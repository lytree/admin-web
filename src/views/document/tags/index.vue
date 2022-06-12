<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <div class="col-span-2">
      <n-card class="min-h-560px" title="添加标签">
        <n-form ref="formRef">
          <n-form-item label="名称">
            <n-input></n-input>
          </n-form-item>
          <n-form-item label="别名">
            <n-input></n-input>
          </n-form-item>
          <n-form-item label="颜色">
            <n-input></n-input>
          </n-form-item>
          <n-form-item label="封面图">
            <n-input></n-input>
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="handleValidateButtonClick"> 验证 </n-button>
          </div>
        </n-form>
      </n-card>
    </div>
    <div class="col-span-4">
      <n-card class="min-h-560px" title="所有标签">
        <n-space>
          <n-tag> 爱在西元前 </n-tag>
          <n-tag type="success"> 不该 </n-tag>
          <n-tag type="warning"> 超人不会飞 </n-tag>
          <n-tag type="error"> 手写的从前 </n-tag>
          <n-tag type="info"> 哪里都是你 </n-tag>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInst, useMessage, NButton } from 'naive-ui';

const formRef = ref<FormInst | null>(null);
const message = useMessage();
function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate(errors => {
    if (!errors) {
      message.success('验证成功');
    } else {
      console.log(errors);
      message.error('验证失败');
    }
  });
}
</script>
<style scoped></style>
