<template>
  <n-modal
    v-model:show="dialogShow"
    :bordered="false"
    :title="title"
    preset="card"
    class="w-[1024px]"
    @after-enter="getDataSource()"
  >
    <n-space><n-button @click="deleteByselect">删除所选项</n-button></n-space>
    <n-divider />
    <loading-empty-wrapper class="h-520px" :loading="loading" :empty="empty">
      <n-data-table
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="dataSource"
        :pagination="paginationReactive"
        :row-key="rowKey => rowKey.id"
        :remote="true"
        :flex-height="true"
        class="h-480px"
        striped
        checked
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </loading-empty-wrapper>
  </n-modal>
</template>
<script lang="ts" setup>
import { DataTableColumn, NButton, NSpace, useMessage } from 'naive-ui';
import { router } from '@/router';
import { useLoadingEmpty } from '@/hooks';
import {
  deletePostByIds,
  deletePostById,
  listPostApi,
  type PostDetail,
  PostStatus,
  updatePostStatusApi
} from '@/service/api/post';
import { resetPagination, type Pagination } from '@/views/document/common';

interface Props {
  visible: boolean;
  title?: string;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'updateList'): void;
}
const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '回收站'
});

const dialogShow = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});

const paginationReactive = ref<Pagination>(resetPagination());
const message = useMessage();
const dataSource = ref<PostDetail[]>([]);
const checkedRowKeys = ref<string[]>([]);
const keyword = ref<string>('');
const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();
const columns: DataTableColumn<PostDetail>[] = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: '标题',
    key: 'title',
    align: 'center'
  },
  {
    title: '状态',
    key: 'status',
    render: _ => {
      if (_.status === 'PUBLISHED') {
        return '已发布';
      }
      if (_.status === 'RECYCLE') {
        return '回收站';
      }
      if (_.status === 'INTIMATE') {
        return '私密';
      }
      if (_.status === 'DRAFT') {
        return '草稿';
      }
      return '';
    }
  },
  {
    title: '分类',
    key: 'categories',
    render: _ => {
      return _.categories?.map(category => category.slugName).join(',');
    }
  },
  {
    title: '标签',
    key: 'tags',
    render: _ => {
      return _.tags?.map(tag => tag.slugName).join(',');
    }
  },
  {
    title: '发布时间',
    key: 'publicTime'
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(NSpace, { class: 'w-128px' }, () => [
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              if (row.id) {
                router.push({ path: `/document/edit`, query: { postId: row.id } }).catch(err => err);
              }
            }
          },
          { default: () => `编辑` }
        ),
        h(NButton, { text: true, type: 'warning', onClick: () => deleteById(row.id) }, { default: () => `删除` }),
        h(
          NButton,
          { text: true, type: 'primary', onClick: () => updatePostStatus(row.id, PostStatus.DRAFT) },
          { default: () => `恢复` }
        )
      ]);
    }
  }
];
function getDataSource() {
  startLoading();
  listPostApi({
    page: paginationReactive.value.page === undefined ? 0 : paginationReactive.value.page - 1,
    size: paginationReactive.value.pageSize === undefined ? 10 : paginationReactive.value.pageSize - 1,
    keyword: keyword.value,
    statuses: [PostStatus.RECYCLE]
  }).then(req => {
    if (req.data) {
      dataSource.value = req.data.content;
      paginationReactive.value.pageCount = req.data.pages;
      paginationReactive.value.itemCount = req.data.total;
    }
    endLoading();
    setEmpty(!dataSource.value.length);
  });
}
function updatePostStatus(id: string | undefined, status: string) {
  if (id) {
    updatePostStatusApi(id, status).then(req => {
      if (req.error) {
        message.error(req.error.message);
      } else {
        getDataSource();
        emit('updateList');
      }
    });
  }
}
function handlePageChange(currentPage: number) {
  paginationReactive.value.page = currentPage;
  getDataSource();
}
function handlePageSizeChange(pageSize: number) {
  paginationReactive.value.pageSize = pageSize;
  getDataSource();
}
function deleteByselect() {
  deletePostByIds(checkedRowKeys.value).then(req => {
    if (req.error) {
      message.error(req.error.message);
    } else {
      getDataSource();
    }
  });
}
function deleteById(id: string | undefined) {
  if (id) {
    deletePostById(id).then(req => {
      if (req.error) {
        message.error(req.error.message);
      } else {
        getDataSource();
      }
    });
  }
}
</script>
<style></style>
