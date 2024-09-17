import { createAction } from "./create";
import { deleteAction } from "./delete";
import { findAction } from "./find";
import { findManyAction } from "./find-many";
import { updateAction } from "./update";

export const enderecoAction = () => {
  return {
    create: createAction,
    findMany: findManyAction,
    find: findAction,
    update: updateAction,
    delete: deleteAction,
  };
};
