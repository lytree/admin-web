<template>
  <n-form-item :label="name" path="value"
    ><n-input-number v-model:value="modelValue" class="w-full" :min="1" :max="50" :placeholder="desc" />
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
  (e: 'update:value', val: number): void;
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  value: '',
  desc: ''
});

const emit = defineEmits<Emits>();
const modelValue = computed({
  get() {
    return Number(props.value);
  },
  set(val: number) {
    emit('update:value', val);
  }
});
</script>
