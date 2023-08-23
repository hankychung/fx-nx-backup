export interface OssToken {
  callback: any
  dir: string
  policy: string
  accessid: string
  signature: string
  host: string
  expire: number
}

export interface ITaskFile {
  file_id: string
  file_name: string
  length: number
  nick_name: string
  creator_id: string
  comment_id: string
  // share_to: [] | null
  shared_task: Array<{
    comment_id: string
    flyele_id: string
    file_name: string
    bound_at: number
    bound_by: string
  }>
}

/** 下载文件的类型 */
export type DownloadFileFlyeleType =
  | 'task'
  | 'record'
  | 'project'
  | 'project_file'
  | 'workspace'
  | 'objective'
  | 'kr'

export interface IDownloadFileApi {
  fileId: string
  flyeleId: string
  grantor?: string
  flyeleType?: DownloadFileFlyeleType
  subPath: string
  customSavePath: boolean
  downloadUrl?: string // 下载链接，有传的时候，则不适用内部拼接的 url
  open?: boolean
  shouldReplaceHeicBlob?: boolean // 时候要检测下载的 blob 是 heic 的，是的话就换一个接口重新下 blob
}

export interface ISaveFileToCloudApi {
  fileId?: string
  flyele_id: string
  flyele_type?: string
}

export interface IOnlineImageApi {
  ids: string[]
  flyeleId: string
  ossConfig?: string
  grantor?: string
  to?: 'private_chat' | ''
}

export interface IBindAndUnBindFileParams<T = string> {
  businessId: string
  fileIds: T
  commentId?: string
  entry?: string
  fileUpload?: string
  directory_id?: string
}

export interface FlyDoc {
  file_id: string
  file_name: string
  // file_size: string
  flyele_name: string
  nick_name: string
  length: number // 文件大小
  source: 1 | 2 | 3 // 	1->自动上传 2->预览后同步 3->自动同步所有文件
  create_at: number // 创建时间
  // create_at: number
  creator_id: string
  // disabled: boolean
  // length: number
  // original_id: string
  // resource: string
  // share_to: any[]
  // shared_task: any[]
  thumb?: string
  /** 来源 */
  title: string
}

export interface ImagePreviewParams {
  comment_id?: string
  create_at: number
  file_id: string
  flyele_id: string
  flyele_type: string
  image_source: string
  is_new?: boolean
  file_name?: string
  isVip?: boolean
}

export interface BatchSyncFlyeleFileParams {
  files: string[]
  flyele_id: string
  flyele_type: string
}

// libs/types/src/project.ts 这里有个名字很像的
// 现在还没用到，先不理
// export interface IProjectFile {
//   comment_id?: string
//   create_at: number
//   creator_id: string
//   file_id: string
//   file_name: string
//   flyele_type: string
//   length: number
//   nick_name: string
//   avatar: string
//   share_task: {
//     bound_at: number
//     bound_by: string
//     comment_id: string
//     file_name: string
//     flyele_id: string
//     flyele_type: string
//   }
// }

// export interface IProjectTaskFile extends IProjectFile {
//   ref_title: string
//   ref_id: string
// }

export interface IFileIntegration {
  create_at: number
  file_id: string
  file_name: string
  flyele_id: string
  flyele_type: string
  length: number
  origin_name: string
}
