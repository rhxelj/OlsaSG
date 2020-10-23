import request from "superagent";

import IpServidor from "../../../../VariablesDeEntorno";
import CodigoError from "../../../../../../lib/CodigoError";
// Lee Rubro por codigo de gupo

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const stkGrabaMovSalEnvase = (
  Envase,
  StkItemsGrupo,
  StkItemsRubro,
  idStkItems,
  cantarestar
) => {
  const url = IpServidor + "/stkmovenvase";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ Envase: Envase })
    .send({ StkItemsGrupo: StkItemsGrupo })
    .send({ StkItemsRubro: StkItemsRubro })
    .send({ idStkItems: idStkItems })
    .send({ cantarestar: cantarestar })
    .set("X-API-Key", "foobar")
    .then(function (res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0) toast("EXITO!!!!");
      // alert("EXITO");
      else alert("No modifico");
    })
    .catch((err) => CodigoError(err));
};