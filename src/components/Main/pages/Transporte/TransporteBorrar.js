import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

import IpServidor from "../VariablesDeEntorno";
import CodigoError from '../../../lib/CodigoError'

export function TransporteBorrar(props) {
    const { idTransporte } = props;
    const url = IpServidor + "/transporteborrar/?id=" + idTransporte;
    request
        .delete(url)
        .set("Content-Type", "application/json")
        .then(function () {
            // res.body, res.headers, res.status
        })
        .catch((err) => CodigoError(err));
}
