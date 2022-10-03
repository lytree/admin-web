import { VNodeChild } from 'vue';
import { PostDetail, PostStatus } from '@/service/api/post';

interface Pagination {
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
}

const resetPost = (): PostDetail => {
  return {
    id: '',
    title: '',
    status: PostStatus.DRAFT,
    slug: '',
    publicTime: "",
    metaKeywords: '',
    metaDescription: '',
    thumbnail: '',
    summary: '',
    password: '',
    topPriority: 0,
    disallowComment: 0,
    tagIds: [],
    categoryIds: [],
    originalContent: '',
    formatContent: ''
  };
};
const resetPagination = (): Pagination => {
  return {
    page: 1,
    pageCount: 1,
    pageSize: 10,
    showSizePicker: true,
    itemCount: 0,
    pageSizes: [5, 10, 20, 30, 40],
    prefix: ({ itemCount }) => {
      return `总共 ${itemCount} 条`;
    }
  };
};

export { resetPost, resetPagination, Pagination };
