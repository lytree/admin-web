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
      <loading-empty-wrapper class="h-520px" :loading="loading" :empty="empty">
        <n-data-table
          :columns="columns"
          :data="dataSource"
          :flex-height="true"
          :pagination="paginationReactive"
          :row-key="postId"
          class="h-520px"
          @update:page="handlePageChange"
        /> </loading-empty-wrapper
    ></n-space>
    <recycle-post-modal v-model:visible="recycleVisible"></recycle-post-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { DataTableColumn } from 'naive-ui';
import { useLoadingEmpty } from '@/hooks';
import { listPost, type PostDetail } from '@/service/api/post';
import { RecyclePostModal } from './component';
import MaterialSymbolsAdd from '~icons/material-symbols/add';
import MaterialSymbolsDelete from '~icons/material-symbols/delete';

const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();

const columns: DataTableColumn[] = [
  {
    title: '标题',
    key: 'postTitle',
    align: 'center'
  },
  {
    title: '状态',
    key: 'postStatus'
  },
  {
    title: '分类',
    key: 'categories'
  },
  {
    title: '标签',
    key: 'tags'
  },
  {
    title: '发布时间',
    key: 'publicTime'
  }
];
const recycleVisible = ref<boolean>(false);
const dataSource = ref<PostDetail[]>([]);
const paginationReactive = ref({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }: { itemCount: number }) {
    return `Total is ${itemCount}.`;
  }
}) as any;

const postId = (rowData: PostDetail) => {
  return rowData.id;
};
function getDataSource() {
  startLoading();
  listPost({ keyword: '' }).then(req => {
    if (req.data) {
      dataSource.value = req.data.content;
      paginationReactive.value.pageCount = req.data.pages;
      paginationReactive.value.prefix({ itemCount: req.data.total });
    }
    endLoading();
    setEmpty(!dataSource.value.length);
  });
}

function handlePageChange(currentPage: number) {
  console.log(currentPage);
}
onMounted(() => {
  getDataSource();
});
</script>
<style scoped></style>
