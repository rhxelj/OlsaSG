import { TransporteAgregar } from "./TransporteAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      TransporteAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
