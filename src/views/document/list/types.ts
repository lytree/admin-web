import { ref, VNodeChild } from 'vue';
import { listPostApi, updatePostStatusApi, type PostDetail } from '@/service/api/post';

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
const publicVisible = ref<boolean>(false);
const dataSource = ref<PostDetail[]>([]);
const keyword = ref<string>('');

function updatePostStatus(id: string | undefined, status: string) {
  if (id) {
    updatePostStatusApi(id, status);
  }
}
export { post, paginationReactive, publicVisible, dataSource, keyword, updatePostStatus };
