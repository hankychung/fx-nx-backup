import { RoutePath } from '../routes/const'

const invalidRoutes = [RoutePath.board]

const validRoutes = Object.values(RoutePath).filter(
  (route) => !invalidRoutes.includes(route)
)

export const checkValidRoute = (route: RoutePath) => validRoutes.includes(route)
