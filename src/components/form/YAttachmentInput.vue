<template>
  <div>
    <n-form-item :label="name" path="value"
      ><n-input-group>
        <n-input v-model:value="modelValue" class="w-2/3" type="text" :placeholder="desc" />
        <n-button type="primary" @click="attachmentModalVisible = true"> <icon-ant-design-picture /> </n-button>
      </n-input-group>
    </n-form-item>
    <attachment-select-modal
      v-model:visible="attachmentModalVisible"
      :multi-select="false"
      @confirm="handleSelectAttachment"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

interface Props {
  name: string;
  value: string;
  desc?: string;
}
interface Emits {
  (e: 'update:value', val: string): void;
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  value: '',
  desc: ''
});
const emit = defineEmits<Emits>();
const attachmentModalVisible = ref<boolean>(false);

const modelValue = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit('update:value', val);
  }
});
const handleSelectAttachment = ({ raw }: any) => {
  if (raw.length) {
    emit('update:value', raw[0].path);
  }
};
</script>
