import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
// Lee Rubro por codigo de gupo

export const stkrubroleeconfgrp = (cuallee, StkRubroCodGrp) => {
  console.log('cuallee  ', cuallee)
  console.log('StkRubroCodGrp  ', StkRubroCodGrp)
  return new Promise(resolve => {
    const url = IpServidor +
      "/stkrubroleerconfgrp/?cuallee=" +
      cuallee +
      "&StkRubroCodGrp=" +
      StkRubroCodGrp;
    console.log('url  ', url)
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubroconfgrp = JSON.parse(res.text);
        resolve(stkrubroconfgrp);
      });
  });
};
