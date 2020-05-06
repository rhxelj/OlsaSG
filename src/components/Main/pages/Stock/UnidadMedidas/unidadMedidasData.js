import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function unidadMedidasData() {
  return new Promise(function(resolve, reject) {
    const url = IpServidor + "/stkunmedleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const unidad_medidas = JSON.parse(res.text);
        resolve(unidad_medidas);
      });
    // const url = IpServidor + "/stkgrupoleer";
    // request
    //   .get(url)
    //   .set("Content-Type", "application/json")
    //   .then((res) => {
    //     const grupos = JSON.parse(res.text);
    //     resolve(grupos);
    //     //.catch() //Todo: agregar el catch error.
    //   });
  });
}
