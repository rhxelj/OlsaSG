import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";


export function presupConfTipoModificar(props) {
    const {
        idPresupConfTipo,
        PresupConfTipoLargo,
        PresupConfTipoAncho,
        PresupConfTipoAnexo,
        PresupConfTipoCant,
        PresupConfTipoDesc,
        PresupConfTipoRubro } = props;

    const url = IpServidor + "/presupconftipomodificar/?id=" + idPresupConfTipo;
    request
        .post(url)
        .set("Content-Type", "application/json")
        .send({ PresupConfTipoAnexo: PresupConfTipoAnexo })
        .send({ PresupConfTipoLargo: PresupConfTipoLargo })
        .send({ PresupConfTipoAncho: PresupConfTipoAncho })
        .send({ PresupConfTipoCant: PresupConfTipoCant })
        .send({ PresupConfTipoDesc: PresupConfTipoDesc })
        .send({ PresupConfTipoRubro: PresupConfTipoRubro })
        .then(function (res) { });
}