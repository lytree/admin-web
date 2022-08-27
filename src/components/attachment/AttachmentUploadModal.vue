<template>
  <n-modal
    v-model:show="modelVisible"
    :bordered="false"
    preset="card"
    class="w-[500px]"
    :mask-closable="true"
    :title="title"
    @after-leave="handleBeforeLeave"
  >
    <n-upload
      directory-dnd
      :action="url"
      :max="5"
      :multiple="props.multiple"
      :name="props.fieldName"
      :headers="
        () => {
          return {
            Authorization: getToken()
          };
        }
      "
      show-retry-button
      show-preview-button
      method="POST"
      list-type="image"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <mdi-archive-arrow-down class="text-[32px]" />
        </div>
        <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
      </n-upload-dragger>
    </n-upload>
  </n-modal>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { getToken } from '@/utils';
import { getEnvConfig } from '~/.env-config';
import MdiArchiveArrowDown from '~icons/mdi/archive-arrow-down';
import { UploadFileInfo } from 'naive-ui';

interface Props {
  visible: boolean;
  multiple?: boolean;
  title?: string;
  fieldName?: string;
  onBeforeLeave?: Function;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '上传附件',
  multiple: false,
  fieldName: 'file'
});

const emit = defineEmits<Emits>();

const modelVisible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});
const url = computed(() => {
  const envConfig = getEnvConfig(import.meta.env);
  const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'true';
  return isHttpProxy ? `${envConfig.proxy}/admin/resource/upload` : `${envConfig.url}/admin/resource/upload`;
});
function handleBeforeLeave() {
  const onBeforeLeave = props.onBeforeLeave;
  if (onBeforeLeave) {
    onBeforeLeave.call(null);
  }
}
const handleFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  console.log(event);
  // message.success((event?.target as XMLHttpRequest).response);
  // const ext = file.name.split('.')[1];
  // file.name = `更名.${ext}`;
  // file.url = '__HTTPS__://www.mocky.io/v2/5e4bafc63100007100d8b70f';
  // return file;
};
</script>
