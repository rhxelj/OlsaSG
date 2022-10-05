import request from 'superagent'

import IpServidor from "../../../VariablesDeEntorno";

export const presupencableenro = (Presup) => {

    return new Promise(resolve => {
        const url = IpServidor + "/presupencableenro/?id=" + Presup;
        request
            .get(url)
            .set('Content-Type', 'application/json')
            .then(res => {

                const renglones = JSON.parse(res.text);

                resolve(renglones);

            })
    })
}
