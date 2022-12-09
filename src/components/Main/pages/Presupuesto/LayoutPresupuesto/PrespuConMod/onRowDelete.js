import { presupBorrar } from "./presupBorrar";

export function onRowDelete(oldData) {
    console.log('oldDAta  ', oldData)
    return new Promise((resolve) => {
        setTimeout(() => {
            presupBorrar(oldData);
            resolve();
        }, 1000);
    });
}
