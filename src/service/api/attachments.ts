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
export function listMediaTypes() {
  return request.get<string[]>(`/admin/resource/media_types`);
}
export function listTypes() {
  return request.get<string[]>(`/admin/resource/types`);
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
export const AttachmentType = {
  LOCAL: {
    type: 'LOCAL',
    text: '本地'
  },
  SMMS: {
    type: 'SMMS',
    text: 'SM.MS'
  },
  UPOSS: {
    type: 'UPOSS',
    text: '又拍云'
  },
  QINIUOSS: {
    type: 'QINIUOSS',
    text: '七牛云'
  },
  ALIOSS: {
    type: 'ALIOSS',
    text: '阿里云'
  },
  BAIDUBOS: {
    type: 'BAIDUBOS',
    text: '百度云'
  },
  TENCENTCOS: {
    type: 'TENCENTCOS',
    text: '腾讯云'
  },
  HUAWEIOBS: {
    type: 'HUAWEIOBS',
    text: '华为云'
  },
  MINIO: {
    type: 'MINIO',
    text: 'MinIO'
  }
};
