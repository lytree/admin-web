<template>
  <n-modal v-model:show="dialogShow" :bordered="false" :title="title" preset="card" class="w-[768px]">
    <n-form ref="formRef">
      <n-tabs type="line" animated default-value="general">
        <n-tab-pane name="seo" tab="SEO">
          <n-form-item label="自定义关键词">
            <n-input
              v-model:value="post.metaKeywords"
              :auto-size="{ minRows: 5 }"
              type="textarea"
              placeholder="多个关键词以英文逗号隔开，如不填写，将自动使用标签作为关键词"
            />
          </n-form-item>
          <n-form-item label="自定义描述">
            <n-input
              v-model:value="post.metaDescription"
              :auto-size="{ minRows: 5 }"
              type="textarea"
              placeholder="如不填写，会从文章中自动截取"
            />
          </n-form-item>
        </n-tab-pane>
        <n-tab-pane name="general" tab="常规">
          <n-form-item label="文章标题">
            <n-input v-model:value="post.title" />
          </n-form-item>
          <n-form-item label="文章别名">
            <n-input v-model:value="post.slug" />
          </n-form-item>
          <n-form-item label="分类目录">
            <category-tree ref="categoryTree" v-model:checkedKey="post.categoryIds" />
          </n-form-item>
          <n-form-item label="标签">
            <tag-select v-model:tagIds="post.tagIds" />
          </n-form-item>
          <n-form-item label="摘要">
            <n-input
              v-model:value="post.summary"
              :auto-size="{ minRows: 5 }"
              placeholder="如不填写，会从文章中自动截取"
              type="textarea"
            />
          </n-form-item>
        </n-tab-pane>
        <n-tab-pane name="highClass" tab="高级"
          ><n-form-item label="禁止评论">
            <n-switch v-model:value="post.disallowComment" :checked-value="1" :unchecked-value="0" />
          </n-form-item>
          <n-form-item label="是否置顶">
            <n-switch v-model:value="post.topPriority" :checked-value="1" :unchecked-value="0" />
          </n-form-item>
          <n-form-item label="发表时间：" class="w-50%">
            <n-date-picker
              v-model:value="post.publicTime"
              placement="bottom-start"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择文章发表时间"
              type="datetime"
              clearable
              class="w-full"
            />
          </n-form-item>

          <n-form-item label="访问密码：" class="w-50%">
            <n-input v-model:value="post.password" type="password" />
          </n-form-item>
          <n-form-item label="封面图：" class="w-50%">
            <n-image :src="post.thumbnail"></n-image>
            <n-input
              v-model:value="post.thumbnail"
              allow-clear
              placeholder="点击封面图选择图片，或者输入外部链接"
            ></n-input>
          </n-form-item>
        </n-tab-pane>
        <n-tab-pane name="mate" tab="元数据">
          <n-form-item v-for="(meta, index) in customMetas" :key="index">
            <n-input-group>
              <n-input v-model:value="meta.key" :style="{ width: '50%' }" placeholder="请输入键" clearable> </n-input>
              <n-input v-model:value="meta.value" :style="{ width: '50%' }" placeholder="请输入值" clearable></n-input>
              <n-button @click="deleteMetaList(index)"><ant-design-close-outlined /> </n-button>
            </n-input-group>
          </n-form-item>
          <n-form-item>
            <n-button @click="addMetaList">新增</n-button>
          </n-form-item>
        </n-tab-pane>
      </n-tabs>
    </n-form>
    <template #action>
      <n-space justify="end"
        ><n-button @click="createPost(PostStatus.DRAFT)">保存草稿</n-button>
        <n-button @click="createPost(PostStatus.PUBLISHED)">发布</n-button
        ><n-button @click="dialogShow = false">关闭</n-button></n-space
      >
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { FormInst, useMessage } from 'naive-ui';
import { type PostDetail, savePostApi, PostStatus } from '@/service/api/post';
import { resetPost } from '@/views/document/common';
import AntDesignCloseOutlined from '~icons/ant-design/close-outlined';

interface Props {
  visible: boolean;
  title?: string;
  post: PostDetail;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'getHtml'): string;
}
const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '文章发布'
});

const dialogShow = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});

const message = useMessage();
const formRef = ref<FormInst | null>(null);

const customMetas = ref<Array<{ key: string; value: string }>>([]);
function addMetaList() {
  if (customMetas.value) {
    customMetas.value.push({ key: '', value: '' });
  } else {
    customMetas.value = [{ key: '', value: '' }];
  }
}
function deleteMetaList(metaIndex: number) {
  customMetas.value = customMetas.value.filter((meta, index) => index !== metaIndex);
}
const { post } = toRefs(props);

function createPost(_status: PostStatus) {
  formRef.value?.validate(errors => {
    if (!errors) {
      post.value.status = _status;
      if (_status === PostStatus.PUBLISHED) {
        post.value.formatContent = emit('getHtml');
      }
      savePostApi(post.value).then(req => {
        if (req.error) {
          message.error(req.error.message);
        } else {
          post.value = resetPost();
          dialogShow.value = false;
        }
      });
    }
  });
}
</script>
<style></style>
