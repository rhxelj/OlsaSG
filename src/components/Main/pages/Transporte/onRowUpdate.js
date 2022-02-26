import { TransporteModificar } from "./TransporteModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      TransporteModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
