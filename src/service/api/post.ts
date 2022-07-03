import qs from 'qs';
import { request } from '../request';
import { Category } from './category';
import { Tag } from './tag';

export function listPost({
  page = 0,
  size = 10,
  keyword = '',
  more = true
}: {
  page: number;
  size: number;
  keyword?: string;
  more?: boolean;
}) {
  return request.get<PageInfo.Page<PostDetail>>(
    `/admin/posts?${qs.stringify({
      page,
      size,
      keyword,
      more
    })}`
  );
}
export function savePost(postDetail: PostDetail) {
  return request.post<PostDetail>(`/admin/posts/save`, postDetail);
}
export function getOne(id: string) {
  return request.get<PostDetail>(`/admin/posts/${id}`);
}
export interface PostDetail {
  id?: string;
  title: string;
  status: number;
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
