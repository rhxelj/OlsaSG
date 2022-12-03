import request from "superagent";
import IpServidor from '../../../VariablesDeEntorno'


export const DatosEncabPresupEleg = (id) => {
    var idpresup = id
    var url
    url = IpServidor + '/datosencabpresupeleg/?idpresup=' + idpresup;

    return new Promise(resolve => {
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then(res => {
                const datosencabezado = JSON.parse(res.text);

                resolve(datosencabezado);
            });
    });
};