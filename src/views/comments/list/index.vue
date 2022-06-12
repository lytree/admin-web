<template>
  <loading-empty-wrapper class="h-720px" :loading="loading" :empty="empty">
    <n-data-table
      :columns="columns"
      :data="comment?.content"
      :flex-height="true"
      :pagination="pagination"
      :row-key="rowKey"
      class="h-720px"
    />
  </loading-empty-wrapper>
</template>

<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import { useLoadingEmpty } from '@/hooks';
import { fetchComment, type Comments } from '@/service/api/comment';

const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();

const message = useMessage();
const comment = ref<PageInfo.Page<Comments>>();
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount = 0 }) {
    return `Total is ${itemCount}.`;
  }
});

const rowKey = (rowData: Comments) => {
  return rowData.id;
};
const sendMail = (rowData: Comments) => {
  message.info(`send mail to ${rowData.author}`);
};
const columns = [
  {
    title: '评论者',
    key: 'author'
  },
  {
    title: '评论者ip',
    key: 'authorIp'
  },
  {
    title: '评论者邮箱',
    key: 'authorEmail'
  },
  {
    title: '评论创建时间',
    key: 'createTime'
  },
  {
    title: '评论状态',
    key: 'status'
  },
  {
    title: 'Action',
    key: 'actions',
    render(row: Comments) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => sendMail(row)
        },
        { default: () => 'Send Email' }
      );
    }
  }
];
onMounted(async () => {
  startLoading();
  const { data } = await fetchComment({});
  endLoading();
  if (data) {
    comment.value = data;
    setEmpty(!comment.value?.content.length);
    return;
  }
  setEmpty(true);
});
</script>
<style scoped></style>
