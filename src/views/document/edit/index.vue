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
      <y-markdown
        v-model:value="post.originalContent"
        :dark-mode="theme.darkMode"
        :toolbars="toolbars"
        @get="getHtml"
      />
    </n-card>
    <publish-post-modal
      v-model:visible="publicVisible"
      title="发布文章"
      :post="post"
      @create-post="createPost"
    ></publish-post-modal
    ><attachment-select-modal v-model:visible="attachmentVisible" @save-after="insertImg"></attachment-select-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import Vditor from 'vditor';
import {} from 'vditor/dist/method';
import { useThemeStore } from '@/store';
import { getOneApi, PostDetail, PostStatus, savePostApi } from '@/service/api/post';
import YMarkdown from '@/components/common/Markdown.vue';
import { resetPost } from '@/views/document/common';
import PublishPostModal from './component/PublishPostModal/index.vue';
import { AttachmentsDetail } from '@/service/api/attachments';

const theme = useThemeStore();
const route = useRoute();
const publicVisible = ref<boolean>(false);
const attachmentVisible = ref<boolean>(false);
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
        // post.value = resetPost();
        publicVisible.value = false;
        message.info('保存成功');
      }
    });
  }
}

const toolbars: IMenuItem[] = [
  {
    name: 'upload_tool',
    tipPosition: 's',
    tip: '选择图片',
    className: 'vditor-toolbar__item',
    icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
    click: (_event: Event, _vditor: IVditor) => (attachmentVisible.value = true)
  }
];

function insertImg(selected: AttachmentsDetail[]) {
  console.log(selected);
  if (selected && selected.length > 0 && editorV.value) {
    let succFileText = '';
    const vditor = editorV.value;
    selected.forEach((attachment, _index) => {
      const type = attachment.mediaType;
      if ('audio/*' === type || 'audio/ogg' === type) {
        if (vditor.getCurrentMode() === 'wysiwyg') {
          succFileText += `<div class="vditor-wysiwyg__block" data-type="html-block"
     data-block="0"><pre><code>&lt;audio controls="controls" src="${attachment.url}"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="${attachment.url}"></audio></pre></div>\n`;
        } else if (vditor.getCurrentMode() === 'ir') {
          succFileText += `<audio controls="controls" src="${attachment.url}"></audio>\n`;
        } else {
          succFileText += `[${attachment.name}](${attachment.url})\n`;
        }
      } else if ('image/png' === type || 'image/jpeg' === type || 'image/webp' === type) {
        if (vditor.getCurrentMode() === 'wysiwyg') {
          succFileText += `<img alt="${attachment.name}" src="${attachment.url}">\n`;
        } else {
          succFileText += `![${attachment.name}](${attachment.url})\n`;
        }
      } else if (vditor.getCurrentMode() === 'wysiwyg') {
        succFileText += `<a href="${attachment.url}">${attachment.name}</a>\n`;
      } else {
        succFileText += `[${attachment.name}](${attachment.url})\n`;
      }
    });
    vditor.insertValue(succFileText, true);
  }
}
</script>
