import { stkProveedoresAgregar } from "./ProveedoresAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      stkProveedoresAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
