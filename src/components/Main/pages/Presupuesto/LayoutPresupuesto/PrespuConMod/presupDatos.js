import IpServidor from "../../../VariablesDeEntorno";
import request from "superagent";

export const presupDatos = (date) => {
    return new Promise(function (resolve) {
        const url = IpServidor + "/presupencableer/?id=" + date;
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const grupos = JSON.parse(res.text);
                resolve(grupos);
            });
    });
}
