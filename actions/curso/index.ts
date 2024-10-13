import { createAction } from './create'
// import { deleteAction } from './delete'
import { findAction } from './find'
// import { findManyAction } from './find-many'
// import { updateAction } from './update'

export const cursoAction = () => {
  return {
    create: createAction,
    // delete: deleteAction,
    find: findAction,
    // findMany: findManyAction,
    // update: updateAction,
  }
}
