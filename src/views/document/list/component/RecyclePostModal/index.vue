<template>
  <n-modal v-model:show="dialogShow" :bordered="false" :title="title" preset="card" class="w-[1024px]">
    <n-space><n-button>删除所选项</n-button></n-space>
    <n-divider />
    <loading-empty-wrapper class="h-520px" :loading="loading" :empty="empty">
      <n-data-table
        :columns="columns"
        :data="dataSource"
        :row-key="rowKey"
        :flex-height="true"
        class="h-480px"
        striped
        @update:checked-row-keys="handleCheck"
      />
    </loading-empty-wrapper>
  </n-modal>
</template>
<script lang="ts" setup>
import { DataTableColumn, DataTableRowKey } from 'naive-ui';
import { useLoadingEmpty } from '@/hooks';
import { getRandomInteger } from '@/utils';

interface Props {
  visible: boolean;
  title?: string;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
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

interface DataSource {
  name: string;
  age: number;
  address: string;
  key: number;
}

const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();

const columns: DataTableColumn[] = [
  {
    type: 'selection',
    options: ['all', 'none']
  },

  {
    title: 'Name',
    key: 'name',
    align: 'center'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
];
const checkedRowKeys = ref<DataTableRowKey[]>([]);
const dataSource = ref<DataSource[]>([]);
const rowKey = (row: DataSource) => row.key;
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeys.value = rowKeys;
}
function createDataSource(): DataSource[] {
  return Array(100)
    .fill(1)
    .map((_item, index) => {
      return {
        name: `Name${index}`,
        age: getRandomInteger(30, 20),
        address: '中国',
        key: index
      };
    });
}

function getDataSource() {
  startLoading();
  setTimeout(() => {
    dataSource.value = createDataSource();
    endLoading();
    setEmpty(!dataSource.value.length);
  }, 1000);
}

onMounted(() => {
  getDataSource();
});
</script>
<style></style>
