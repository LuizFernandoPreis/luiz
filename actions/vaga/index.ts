import { createAction } from './create'
// import { deleteAction } from './delete'
// import { findAction } from './find'
import { findManyAction } from './find-many'
import { findAllAction } from './findAll'
// import { updateAction } from './update'

export const vagaAction = () => {
  return {
    create: createAction,
    // delete: deleteAction,
    // find: findAction,
    findMany: findManyAction,
    findAll: findAllAction,
    // update: updateAction,
  }
}