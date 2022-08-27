<template>
  <n-form-item :label="name" path="value"> <n-select v-model:value="modelValue" :options="options" /> </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  name: string;
  value: string;
  content?: string;
}
interface Emits {
  (e: 'update:value', val: string): void;
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  value: '',
  content: '[]'
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
const options = computed(() => {
  return JSON.parse(props.content);
});
</script>
