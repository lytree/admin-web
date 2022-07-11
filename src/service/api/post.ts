import qs from 'qs';
import { request } from '../request';
import { Category } from './category';
import { Tag } from './tag';

export function listPostApi({
  page = 0,
  size = 10,
  keyword = '',
  statuses = ['PUBLISHED', 'DRAFT', 'INTIMATE'],
  more = true
}: {
  page: number;
  size: number;
  keyword?: string;
  statuses?: string[];
  more?: boolean;
}) {
  return request.get<PageInfo.Page<PostDetail>>(
    `/admin/posts?${qs.stringify(
      {
        page,
        size,
        keyword,
        statuses,
        more
      },
      { indices: false }
    )}`
  );
}
export function savePostApi(postDetail: PostDetail) {
  return request.post<PostDetail>(`/admin/posts/save`, postDetail);
}
export function getOneApi(id: string) {
  return request.get<PostDetail>(`/admin/posts/${id}`);
}
export function updatePostStatusApi(id: string, status: string) {
  return request.put<PostDetail>(`/admin/posts/${id}/status/${status}`);
}
export function updatePostStatusBatchApi(ids: number[], status: string) {
  return request.put<PostDetail>(`/admin/posts/status/${status}`, ids);
}
export interface PostDetail {
  id?: string;
  title: string;
  status: string;
  slug: string;
  publicTime: number;
  metaKeywords: string;
  metaDescription: string;
  thumbnail: string;
  summary: string;
  password?: string;
  topPriority: number;
  disallowComment: number;
  tagIds: string[];
  categoryIds: string[];
  tags?: Tag[];
  categories?: Category[];
  content?: string;
}
