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
    ><attachment-select-modal v-model:visible="attachmentVisible"></attachment-select-modal>
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
const getElement = (vditor: IVditor) => {
  switch (vditor.currentMode) {
    case 'ir':
      return vditor.ir?.element;
    case 'wysiwyg':
      return vditor.wysiwyg?.element;
    case 'sv':
      return vditor.sv?.element;
  }
};

const toolbars: IMenuItem[] = [
  {
    name: 'upload_tool',
    tipPosition: 's',
    tip: '选择图片',
    className: 'vditor-toolbar__item',
    icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
    click: (event: Event, vditor: IVditor) => (attachmentVisible.value = true)

    //       let succFileText = '';
    //       Object.keys(response.data.succMap).forEach(key => {
    //         const path = response.data.succMap[key];
    //         const lastIndex = key.lastIndexOf('.');
    //         let type = key.substr(lastIndex);
    //         const filename = vditor.options.upload.filename(key.substr(0, lastIndex)) + type;
    //         type = type.toLowerCase();
    //         if (type.indexOf('.wav') === 0 || type.indexOf('.mp3') === 0 || type.indexOf('.ogg') === 0) {
    //           if (vditor.currentMode === 'wysiwyg') {
    //             succFileText += `<div class="vditor-wysiwyg__block" data-type="html-block"
    //  data-block="0"><pre><code>&lt;audio controls="controls" src="${path}"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="${path}"></audio></pre></div>\n`;
    //           } else if (vditor.currentMode === 'ir') {
    //             succFileText += `<audio controls="controls" src="${path}"></audio>\n`;
    //           } else {
    //             succFileText += `[${filename}](${path})\n`;
    //           }
    //         } else if (
    //           type.indexOf('.apng') === 0 ||
    //           type.indexOf('.bmp') === 0 ||
    //           type.indexOf('.gif') === 0 ||
    //           type.indexOf('.ico') === 0 ||
    //           type.indexOf('.cur') === 0 ||
    //           type.indexOf('.jpg') === 0 ||
    //           type.indexOf('.jpeg') === 0 ||
    //           type.indexOf('.jfif') === 0 ||
    //           type.indexOf('.pjp') === 0 ||
    //           type.indexOf('.pjpeg') === 0 ||
    //           type.indexOf('.png') === 0 ||
    //           type.indexOf('.svg') === 0 ||
    //           type.indexOf('.webp') === 0
    //         ) {
    //           if (vditor.currentMode === 'wysiwyg') {
    //             succFileText += `<img alt="${filename}" src="${path}">\n`;
    //           } else {
    //             succFileText += `![${filename}](${path})\n`;
    //           }
    //         } else if (vditor.currentMode === 'wysiwyg') {
    //           succFileText += `<a href="${path}">${filename}</a>\n`;
    //         } else {
    //           succFileText += `[${filename}](${path})\n`;
    //         }
    //       });
    //       setSelectionFocus(vditor.upload.range);
    //       document.execCommand('insertHTML', false, succFileText);
    //       vditor.upload.range = getSelection().getRangeAt(0).cloneRange();
  }
];
</script>
<style scoped></style>
