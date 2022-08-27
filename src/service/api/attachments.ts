import qs from 'qs';
import { request } from '../request';

export function listAttachmentsApi({
  page = 0,
  size = 12
}: {
  page: number;
  size: number;
  mediaType?: string;
  attachmentType?: string;
}) {
  return request.get<PageInfo.Page<AttachmentsDetail>>(
    `/admin/resource?${qs.stringify({
      page,
      size
    })}`
  );
}

export interface AttachmentsDetail {
  id?: string;
  name: string;
  description: string;
  fileKey: string;
  thumbnail: string;
  url: string;
  mediaType: string;
  type: string;
}
