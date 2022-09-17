import IpServidor from "../../../VariablesDeEntorno";
import request from "superagent";

export const presupDatosReng = (detbusca) => {
    return new Promise(function (resolve) {
        const url = IpServidor + "/presuprengleer/?id=" + detbusca;
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const grupos = JSON.parse(res.text);
                resolve(grupos);
            });
    });
}
