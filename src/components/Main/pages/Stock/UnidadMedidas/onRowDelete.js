import { stkUnMedBorrar } from "./stkUnMedBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        stkUnMedBorrar(oldData);
      }
      resolve();
    }, 1000);
  });
}