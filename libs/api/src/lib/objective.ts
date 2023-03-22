import {
  ObjectiveSnapMapItem,
  ObjectiveSnapMapParams
} from '../types/objective'

type Register<T> = Omit<T, 'register'>

type RegisterT = Register<ObjectiveApi>

class ObjectiveApi {
  getSnapList(_params: { objective_id: string }) {
    return Promise.resolve({} as ObjectiveSnapMapItem)
  }

  getSnapMap(_params: ObjectiveSnapMapParams) {
    return Promise.resolve({} as ObjectiveSnapMapItem[])
  }

  register<T extends keyof RegisterT>(key: T, fn: RegisterT[T]) {
    ;(this as unknown as RegisterT)[key] = fn
  }
}

export const objectiveApi = new ObjectiveApi()

export * from '../types/objective'
