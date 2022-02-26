import { TransporteBorrar } from "./TransporteBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      TransporteBorrar(oldData);
      // }
      resolve();
    }, 1000);
  });
}
