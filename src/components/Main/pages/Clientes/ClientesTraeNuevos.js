import IpServidor from '../VariablesDeEntorno'
import request from "superagent";

export function clientestraeNuevos() {
  return new Promise(function (resolve) {
    console.log('estoy en clietnestraenuevos')
    const url = IpServidor + "/clientestraenuevos";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const clientes = JSON.parse(res.text);
        resolve(clientes);
      });

  });
}
