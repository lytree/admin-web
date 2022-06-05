import { ref, markRaw } from 'vue';
import YTextInput from '@/components/form/YTextInput.vue';
import YNumberInput from '@/components/form/YNumberInput.vue';
import YPasswordInput from '@/components/form/YPasswordInput.vue';
import YSelect from '@/components/form/YSelect.vue';
import YSwitch from '@/components/form/YSwitch.vue';
import YTextareaInput from '@/components/form/YTextareaInput.vue';
import YAttachmentInput from '@/components/form/YAttachmentInput.vue';

export const component: { [key: string]: any } = ref({
  'y-text-input': markRaw(YTextInput),
  'y-number-input': markRaw(YNumberInput),
  'y-password-input': markRaw(YPasswordInput),
  'y-textarea-input': markRaw(YTextareaInput),
  'y-attachment-input': markRaw(YAttachmentInput),
  'y-select': markRaw(YSelect),
  'y-switch': markRaw(YSwitch)
});
