import request from "superagent";
import IpServidor from '../../../VariablesDeEntorno'


export const OrdTrabLeeItems = (StkRubroAbrElegido) => {
    var stkrubroabr = StkRubroAbrElegido
    var url
    url = IpServidor + '/stkitemsleeabrrub/?abr="' + stkrubroabr + '"';
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