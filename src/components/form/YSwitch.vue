<template>
  <n-form-item :label="name" path="value">
    <n-switch v-model:value="modelValue" checked-value="true" unchecked-value="false" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

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
  value: 'false',
  desc: ''
});
const emit = defineEmits<Emits>();

const modelValue = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit('update:value', val);
  }
});
</script>
