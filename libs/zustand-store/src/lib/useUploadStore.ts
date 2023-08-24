import { create } from 'zustand'
import { IZustandUploadState } from '@flyele-nx/types'

const initUploadStore: IZustandUploadState = { uploadDict: {}, fileDict: {} }

const useUploadStore = create<IZustandUploadState>(() => ({
  ...initUploadStore
}))

export { useUploadStore }
