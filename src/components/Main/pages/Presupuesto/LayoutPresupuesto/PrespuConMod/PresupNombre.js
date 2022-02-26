import request from "superagent";

import IpServidor from "../../../VariablesDeEntorno";


export const PresupNombre = (nombrepresup) => {

    return new Promise(resolve => {
        const url = IpServidor + "/presupnombre/?id=" + nombrepresup;
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then(res => {
                // const aviso = JSON.parse(res.text);
                const aviso = res.statusText
                console.log('res PresupNombre ', res)
                console.log('aviso PresupNombre  ', aviso)
                resolve(aviso);
            });
    });
}


