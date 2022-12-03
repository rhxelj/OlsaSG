import request from "superagent";
import IpServidor from '../../../VariablesDeEntorno'


export const OrdTabArmaTabla = (datoselegidos) => {
    var url
    console.log('datoselegidos OrdTabArmaTabla ', datoselegidos)
    var datoselegidoa = datoselegidos
    url = IpServidor + '/otarmatabla/?datoselegidoa=' + datoselegidoa;
    return new Promise(resolve => {
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then(res => {
                const datosextraidos = JSON.parse(res.text);

                resolve(datosextraidos);
            });
    });
};