import request from "superagent";
import IpServidor from '../../VariablesDeEntorno'
import CodigoError from '../../../../lib/CodigoError'
// import { PresupPreview } from './PresupPreview'
// Lee Rubro por codigo de gupo
export const PresupImprime = (props, nomCliente, otraCondicion, suma, nroPresupuesto, descrip, condpagoeleg, PresupMnMy) => {
    const url1 = IpServidor + "/imppresup";
    //const url1 = IpServidor + "/imppresupdoc";
    request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ datospresup: props })
        .send({ nomCliente: nomCliente })
        .send({ otraCondicion: otraCondicion })
        .send({ suma: suma })
        .send({ nroPresupuesto: nroPresupuesto })
        .send({ descrip: descrip })
        .send({ condpagoeleg: condpagoeleg })
        .send({ PresupMnMy: PresupMnMy })
        .set("X-API-Key", "foobar")
        .then(function (res) {
            const respuesta = JSON.parse(res.text);
            console.log('respuesta  ', respuesta)
        })
        .catch((err) => CodigoError(err));


}
