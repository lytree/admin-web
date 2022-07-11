<template>
  <n-card class="h-full shadow-sm rounded-16px">
    <n-space :vertical="true">
      <div class="grid grid-cols-4 gap-4">
        <div>
          <n-form-item label-placement="left" label="关键词">
            <n-input />
          </n-form-item>
        </div>
        <div>
          <n-form-item label-placement="left" label="文章状态"> <n-select /> </n-form-item>
        </div>
        <div>
          <n-form-item label-placement="left" label="分类目录"> <n-input /> </n-form-item>
        </div>
        <div>
          <n-form-item label-placement="left" label="标签"> <n-select /> </n-form-item>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div>
          <n-space
            ><router-link :to="{ path: '/document/edit' }"
              ><n-button>
                <template #icon><MaterialSymbolsAdd /> </template>添加文章</n-button
              ></router-link
            ><n-button @click="recycleVisible = true">
              <template #icon><MaterialSymbolsDelete /> </template>回收站</n-button
            ></n-space
          >
        </div>
        <div class="col-span-2"></div>
        <div>
          <n-space justify="end"><n-button>查询</n-button><n-button>重置</n-button></n-space>
        </div>
      </div>
      <loading-empty-wrapper class="h-520px min-w-896px" :loading="loading" :empty="empty">
        <n-data-table
          :columns="columns"
          :data="dataSource"
          :flex-height="true"
          :pagination="paginationReactive"
          :row-key="rowKey => rowKey.id"
          :remote="true"
          class="h-520px"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        ></n-data-table> </loading-empty-wrapper
    ></n-space>
    <recycle-post-modal v-model:visible="recycleVisible"></recycle-post-modal>
    <publish-post-modal v-model:visible="publicVisible" title="发布文章" :post="post"></publish-post-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted, VNodeChild } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { DataTableColumn, NButton, NSpace } from 'naive-ui';
import { useLoadingEmpty } from '@/hooks';
import { listPostApi, updatePostStatusApi, type PostDetail } from '@/service/api/post';
import PublishPostModal from '../edit/component/PublishPostModal/index.vue';
import { RecyclePostModal } from './component';
import MaterialSymbolsAdd from '~icons/material-symbols/add';
import MaterialSymbolsDelete from '~icons/material-symbols/delete';

const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();
const router = useRouter();
const route = useRoute();
const columns: DataTableColumn<PostDetail>[] = [
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
        return '私密';
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
        h(
          NButton,
          { text: true, type: 'primary', onClick: () => updatePostStatus(row.id, 'DELETE') },
          { default: () => `删除` }
        ),
        h(NButton, { text: true, type: 'primary', onClick: () => `` }, { default: () => `设置` })
      ]);
    }
  }
];
const recycleVisible = ref<boolean>(false);
const publicVisible = ref<boolean>(false);
const dataSource = ref<PostDetail[]>([]);
const keyword = ref<string>('');
const post = ref<PostDetail>({
  id: '',
  title: '',
  status: '',
  slug: '',
  publicTime: 0,
  metaKeywords: '',
  metaDescription: '',
  thumbnail: '',
  summary: '',
  password: '',
  topPriority: 0,
  disallowComment: 0,
  tagIds: [],
  categoryIds: []
});
const paginationReactive = ref<{
  page: number;
  itemCount: number;
  pageCount: number;
  showSizePicker: boolean;
  pageSize: number;
  pageSizes: number[];
  prefix: (info: {
    startIndex: number;
    endIndex: number;
    page: number;
    pageSize: number;
    pageCount: number;
    itemCount: number | undefined;
  }) => VNodeChild;
}>({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  showSizePicker: true,
  itemCount: 0,
  pageSizes: [5, 10, 20, 30, 40],
  prefix: ({ itemCount }) => {
    return `总共 ${itemCount} 条`;
  }
});
function getDataSource() {
  startLoading();
  listPostApi({
    page: paginationReactive.value.page === undefined ? 0 : paginationReactive.value.page - 1,
    size: paginationReactive.value.pageSize === undefined ? 10 : paginationReactive.value.pageSize - 1,
    keyword: keyword.value
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

function handlePageChange(currentPage: number) {
  paginationReactive.value.page = currentPage;
  getDataSource();
}
function handlePageSizeChange(pageSize: number) {
  paginationReactive.value.pageSize = pageSize;
  getDataSource();
}
function updatePostStatus(id: string | undefined, status: string) {
  if (id) {
    updatePostStatusApi(id, status);
  }
}
onMounted(() => {
  getDataSource();
});
</script>
<style scoped></style>
