import qs from 'qs';
import { request } from '../request';
import { Category } from './category';
import { Tag } from './tag';

export const enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  INTIMATE = 'INTIMATE',
  RECYCLE = 'RECYCLE'
}
export function listPostApi({
  page = 0,
  size = 10,
  keyword = '',
  statuses = [PostStatus.PUBLISHED, PostStatus.DRAFT, PostStatus.INTIMATE],
  more = true
}: {
  page: number;
  size: number;
  keyword?: string;
  statuses?: PostStatus[];
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
export function deletePostByIds(ids: string[]) {
  return request.delete<void>(`/admin/posts`, ids);
}
export function deletePostById(id: string) {
  return request.delete(`/admin/posts/${id}`);
}
export interface PostDetail {
  id?: string;
  title: string;
  status: PostStatus;
  slug: string;
  publicTime: string;
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
  formatContent: string;
  originalContent: string;
}
