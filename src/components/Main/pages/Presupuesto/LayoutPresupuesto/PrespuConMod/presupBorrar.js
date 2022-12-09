import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";
import CodigoError from "../../../../../lib/CodigoError";


export function presupBorrar(props) {
    const { idPresupEncab } = props;
    const url = IpServidor + "/presupborrar/" + idPresupEncab;
    request
        .delete(url)
        .set("Content-Type", "application/json")
        .then(function () { })
        .catch((err) => CodigoError(err));
}
