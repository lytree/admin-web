<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <div class="col-span-2">
      <n-card class="min-h-560px" title="添加分类">
        <n-form ref="formRef">
          <n-form-item label="名称">
            <n-input></n-input>
          </n-form-item>
          <n-form-item label="别名">
            <n-input></n-input>
          </n-form-item>
          <n-form-item label="上级目录">
            <n-select />
          </n-form-item>
          <n-form-item label="封面图">
            <n-input></n-input>
          </n-form-item>
          <n-form-item label="描述">
            <n-input type="textarea"></n-input>
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="handleValidateButtonClick"> 验证 </n-button>
          </div>
        </n-form>
      </n-card>
    </div>
    <div class="col-span-4">
      <n-card class="min-h-560px" title="分类列表">
        <n-tree
          block-line
          checkable
          draggable
          :data="data"
          :render-suffix="renderSuffix"
          :default-expanded-keys="defaultExpandedKeys"
          :selectable="false"
      /></n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { FormInst, useMessage, NButton, TreeOption } from 'naive-ui';
import { repeat } from 'seemly';

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

const data = ref(createData());
const defaultExpandedKeys = ref(['40', '41']);
function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined;
  return repeat(6 - level, undefined).map((_, index) => {
    const key = `${baseKey}${level}${index}`;
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
      level
    };
  });
}

function renderSuffix({ option }: { option: TreeOption }) {
  return h(NButton, { text: true, type: 'primary' }, { default: () => `Suffix-${option.level}` });
}
function createLabel(level: number): string {
  if (level === 4) return '道生一';
  if (level === 3) return '一生二';
  if (level === 2) return '二生三';
  if (level === 1) return '三生万物';
  return '';
}
</script>

<style scoped></style>
