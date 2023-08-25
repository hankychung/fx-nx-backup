import {
  CommonResponse,
  IApplicationDetail,
  IBaseProjectInfo
} from '@flyele-nx/types'
import { useMemoizedFn, useRequest } from 'ahooks'

/**
 author: william   email:362661044@qq.com
 create_at:2022/11/18 6:35 PM
 **/

type IProps = {
  appInfo: {
    appId: string
    appName: string
  }
  project: IBaseProjectInfo
}

// type ICopy = IProps & { copyIdCb: (id: string) => void }
type ICopy = IProps

type IVerify = ICopy & { curProject?: IBaseProjectInfo }

// export const useProjectMoveVerify = () => {

//   /** 获取模版详情 **/
//   const { runAsync: getAppDetail } = useRequest<
//     CommonResponse<IApplicationDetail>,
//     [string]
//   >(
//     (appId) => {
//       return appLibApi.getApplicationDetail(appId)
//     },
//     {
//       manual: true,
//     }
//   )

//   /** 引用app到项目 **/
//   const { runAsync: addApp } = useRequest<any, [IProjectAddAppParams]>(
//     (args) => {
//       const { project_id, application_ids } = args

//       return appLibApi.projectAddApplication(project_id, {
//         application_ids,
//         project_id,
//       })
//     },
//     {
//       manual: true,
//     }
//   )

//   /** 复制app到项目 **/
//   const { runAsync: copyApp } = useRequest<any, [ICopyApplicationParams]>(
//     (args) => {
//       return appLibApi.copyApplication(args)
//     },
//     {
//       manual: true,
//     }
//   )

//   /** 判断当前 app 是否在项目里面 **/
//   /** false 不通过 ， true 通过 **/
//   const verifyAppHasProjectId = useMemoizedFn(
//     async (args: IProps): Promise<boolean> => {
//       const { project, appInfo } = args

//       // 个人项目不走验证
//       if (project.ws_type === SPACE_TYPE.private) return true

//       try {
//         const res = await getAppDetail(appInfo.appId)

//         if (res.data) {
//           const { project_ids = [] } = res.data

//           if (project_ids.includes(project.project_id)) {
//             return true
//           }
//         }

//         return false
//       } catch (e) {
//         return false
//       }
//     }
//   )

//   /**
//    * 把模版引用到项目里面
//    * **/
//   const moveAppToProject = useMemoizedFn(
//     async (args: IProps): Promise<boolean> => {
//       const { project, appInfo } = args

//       try {
//         await CreateAlert({
//           title: `该操作需将【${appInfo.appName}】模版添加到所选项目内，是否继续？`,
//         })
//         await addApp({
//           project_id: project.project_id,
//           application_ids: [appInfo.appId],
//         })

//         return true
//       } catch (e) {
//         // 移动失败
//         return false
//       }
//     }
//   )

//   /**
//    * 模版复制到空间中，加项目引用该app
//    * **/
//   // const copyAppToSpaceAndProject = useMemoizedFn(async (args: ICopy) => {
//   //   const { appInfo, project } = args
//   //
//   //   try {
//   //     await CreateAlert({
//   //       title: `该操作需要将模版【${appInfo.appName}】复制到所选空间模版库中，并添加到所选项目；且移入后将无法移出该空间，是否确认？`,
//   //     })
//   //     await copyApp({
//   //       project_ids: [project.project_id],
//   //       workspace_id: project.workspace_id,
//   //       copy_application_id: appInfo.appId,
//   //     })
//   //
//   //     /**
//   //      * 这期做不了
//   //      * 更新事项，appid 字段
//   //      * **/
//   //     //  copyIdCb(res.data)
//   //
//   //     return true
//   //   } catch (e) {
//   //     // 移动失败
//   //     return false
//   //   }
//   // })

//   /**
//    * 验证与移动模版
//    * 前置当前事项是通过模版创建，个人项目没有
//    * 1、当前事项在团队空间中，移动后的项目判断是否引用该模版，如果没有则需要走引用流程
//    * 2、当前事项不在项目里面，移动到团队空间项目里面，把当前引用复制过去团队空间里面
//    * 3、个人模版事项、个人项目模版事项 不可以移动
//    * **/
//   const verifyAndMove = useMemoizedFn(
//     async (args: IVerify): Promise<boolean> => {
//       const { project, appInfo, curProject } = args

//       /**
//        * 当前没有项目或者移动到个人项目流程
//        * **/
//       if (!curProject || project.ws_type === SPACE_TYPE.private) {
//         if (project.ws_type === SPACE_TYPE.private) {
//           showMsg({ msgType: '错误', content: '个人项目暂不支持模版' })
//           return false
//         }

//         showMsg({ msgType: '错误', content: '个人模版事项暂不支持移动' })
//         return false
//         // return await copyAppToSpaceAndProject(args)
//       }

//       /** 当前存在项目，引用流程 **/
//       const bool = await verifyAppHasProjectId({
//         appInfo,
//         project,
//       })

//       // 验证不通过，
//       if (!bool) {
//         // 不存在，弹窗询问是否移动
//         const res = await moveAppToProject({
//           appInfo,
//           project,
//         })

//         // 不移动就不走下面的流程
//         if (!res) return false
//       }

//       // 验证通过，如果移动个人项目也是通过
//       return true
//     }
//   )

//   return { copyApp, addApp, verifyAndMove, verifyAppHasProjectId, getAppDetail }
// }
