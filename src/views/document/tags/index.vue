<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <n-dialog-provider>
      <div class="col-span-2">
        <n-card class="min-h-560px" title="添加标签">
          <n-form ref="saveRef" :model="saveTag">
            <n-form-item label="名称">
              <n-input v-model:value="saveTag.slug"></n-input>
            </n-form-item>
            <n-form-item label="别名">
              <n-input v-model:value="saveTag.slugName"></n-input>
            </n-form-item>
            <n-form-item label="颜色">
              <n-input-group>
                <n-input v-model:value="saveTag.color" clearable readonly :style="{ width: '90%' }" />
                <n-color-picker
                  v-model:value="saveTag.color"
                  :modes="['hex']"
                  :style="{ width: '10%' }"
                  default-value="#FFFFFFFF"
                ></n-color-picker>
              </n-input-group>
            </n-form-item>
            <n-form-item label="封面图">
              <n-input v-model:value="saveTag.thumbnail"></n-input>
            </n-form-item>

            <div v-if="!isUpdate" style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="saveTags"> 保存 </n-button>
            </div>
            <div v-else style="display: flex; justify-content: flex-end; gap: 5px">
              <n-button round type="primary" @click="saveTags"> 更新 </n-button
              ><n-button round @click="exitUpdate"> 退出更新 </n-button>
            </div>
          </n-form>
        </n-card>
      </div>
      <div class="col-span-4">
        <n-card class="min-h-560px" title="所有标签">
          <n-space
            ><n-tag
              v-for="tag in tagList"
              :key="tag.id"
              :style="{ '--n-close-icon-color': `${tag.color}` }"
              :color="{
                color: theme.darkMode ? '#000000' : '#FFFFFF',
                textColor: tag.color,
                borderColor: tag.color
              }"
              round
              closable
              @click="updateTag(tag)"
              @close.stop="deleteTag(tag.id)"
              >{{ tag.slugName }}</n-tag
            >
          </n-space>
        </n-card>
      </div>
    </n-dialog-provider>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FormInst, useMessage, NButton, useDialog } from 'naive-ui';
import { useThemeStore } from '@/store';
import { Tag, save, deleteTag as deleteApi, list } from '@/service/api/tag';

const theme = useThemeStore();

const saveRef = ref<FormInst | null>(null);
const message = useMessage();
const dialog = useDialog();
const isUpdate = ref<boolean>(false);
const tagList = ref<Tag[]>([]);
const saveTag = ref<Tag>({
  id: '',
  slugName: '',
  slug: '',
  thumbnail: '',
  color: ''
});

onMounted(async () => {
  const { data } = await list();
  if (data) {
    tagList.value = data;
  }
});

function saveTags() {
  saveRef.value?.validate(errors => {
    if (!errors) {
      save(saveTag.value).then(req => {
        if (!req.error) {
          if (isUpdate.value) {
            message.info('更新成功');
            isUpdate.value = false;
          } else {
            message.info('保存成功');
          }
          tagList.value = req.data;
          saveTag.value = {
            id: '',
            slugName: '',
            slug: '',
            thumbnail: '',
            color: ''
          };
        }
      });
    } else {
      message.error('验证失败');
    }
  });
}
function updateTag(tag: Tag) {
  isUpdate.value = true;
  saveTag.value = {
    id: tag.id,
    slugName: tag.slugName,
    slug: tag.slug,
    thumbnail: tag.thumbnail,
    color: tag.color
  };
}
function exitUpdate() {
  isUpdate.value = false;
  saveTag.value = {
    id: '',
    slugName: '',
    slug: '',
    thumbnail: '',
    color: ''
  };
}
function deleteTag(id: string) {
  dialog.warning({
    title: '警告',
    content: '是否删除',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      deleteApi(id).then(req => {
        if (req.data) {
          tagList.value = req.data;
          message.info('删除成功');
        }
      });
    },
    onNegativeClick: () => {
      message.info('取消删除');
    }
  });
}
</script>
<style scoped>
:deep(.n-color-picker-trigger .n-color-picker-trigger__value) {
  display: none;
}
</style>
