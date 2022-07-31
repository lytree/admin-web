<template>
  <div class="h-full">
    <n-card title="新文章" class="shadow-sm rounded-16px h-full">
      <template #header-extra>
        <n-space
          ><n-button> 预览 </n-button> <n-button type="primary" @click="publicVisible = true"> 发布 </n-button></n-space
        >
      </template>
      <div class="py-4">
        <n-input v-model:value="post.title" size="large" placeholder="请输入文章标题"></n-input>
      </div>
      <y-markdown v-model:value="post.originalContent" @get="getHtml" />
    </n-card>
    <publish-post-modal
      v-model:visible="publicVisible"
      title="发布文章"
      :post="post"
      @create-post="createPost"
    ></publish-post-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import Vditor from 'vditor';
import { getOneApi, PostDetail, PostStatus, savePostApi } from '@/service/api/post';
import YMarkdown from '@/components/common/Markdown.vue';
import { resetPost } from '@/views/document/common';
import PublishPostModal from './component/PublishPostModal/index.vue';

const route = useRoute();
const publicVisible = ref<boolean>(false);
const post = ref<PostDetail>(resetPost());
const message = useMessage();
const editorV = ref<Vditor>();
function getHtml(editor: Vditor) {
  editorV.value = editor;
}

onMounted(async () => {
  if (route.query.postId) {
    const { data } = await getOneApi(route.query.postId as string);
    if (data) {
      post.value = data;
    }
  }
});
function createPost(_status: PostStatus) {
  if (editorV.value) {
    post.value.status = _status;
    post.value.formatContent = editorV.value.getHTML();
    post.value.originalContent = editorV.value.getValue();
    savePostApi(post.value).then(req => {
      if (req.error) {
        message.error(req.error.message);
      } else {
        post.value = resetPost();
        publicVisible.value = false;
      }
    });
  }
}
</script>
<style scoped></style>
