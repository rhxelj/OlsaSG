import request from "superagent";
import IpServidor from '../../VariablesDeEntorno'
import CodigoError from '../../../../lib/CodigoError'
// import { PresupPreview } from './PresupPreview'
// Lee Rubro por codigo de gupo
export const PresupMuestraPrevia = (props, nomCliente, telcliente, suma, nroPresupuesto, descrip, condpagoeleg) => {
    const url1 = IpServidor + "/imppresupmuestraprevia";
    //const url1 = IpServidor + "/imppresupdoc";
    request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ datospresup: props })
        .send({ nomCliente: nomCliente })
        .send({ telCliente: telcliente })
        .send({ suma: suma })
        .send({ nroPresupuesto: nroPresupuesto })
        .send({ descrip: descrip })
        .send({ condpagoeleg: condpagoeleg })
        .set("X-API-Key", "foobar")
        .then(function (res) {
            const respuesta = JSON.parse(res.text);
            console.log('respuesta  ', respuesta)
        })
        .catch((err) => CodigoError(err));


}
