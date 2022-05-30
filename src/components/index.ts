import { ref, markRaw } from 'vue';
import YInput from '@/components/form/YTextInput.vue';

export const component: { [key: string]: any } = ref({
  'text-input': markRaw(YInput)
});
