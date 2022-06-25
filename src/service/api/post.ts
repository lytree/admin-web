import qs from 'qs';
import { request } from '../request';

export function listPost({ keyword = '' }: { keyword: string }) {
  return request.get<PageInfo.Page<PostDetail>>(`/admin/posts?${qs.stringify({ keyword })}`);
}
export function savePost(postDetail: PostDetail) {
  return request.post<PostDetail>(`/admin/posts/save`, postDetail);
}
export interface PostDetail {
  id: string;
  postTitle: string;
  postStatus: string;
  postSlug: string;
  publicTime: number;
  metaKeywords: string;
  metaDescription: string;
  thumbnail: string;
  summary: string;
  password?: string;
  topPriority: boolean;
  disallowComment: boolean;
  tagIds: string[];
  categoryIds: string[];
}
