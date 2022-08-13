import request from "superagent";

import IpServidor from "../../../VariablesDeEntorno";


export const PresupNombre = (nombrepresup) => {
    console.log('estoy en PresupNombre  ', nombrepresup)
    var nombrepresupue = "Presupuesto\\ nro\\ " + nombrepresup + "*.pdf";
    return new Promise(resolve => {
        setTimeout(() => {
            const url = IpServidor + "/presupnombre/?id=" + nombrepresupue
            request
                .get(url)
                .set("Content-Type", "application/json")
                .then(res => {
                    console.log('estoy en PresupNombre res ', res)
                    resolve(res.text);
                });
        }, 1000);
    });
}


