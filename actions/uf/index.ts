import { createAction } from "./create";
import { findManyAction } from "./find-many";
import { findAction } from "./find";
import { updateAction } from "./update";
import { deleteAction } from "./delete";

export const ufAction = () => {
  return {
    create: createAction,
    findMany: findManyAction,
    find: findAction,
    update: updateAction,
    delete: deleteAction
  };
};
