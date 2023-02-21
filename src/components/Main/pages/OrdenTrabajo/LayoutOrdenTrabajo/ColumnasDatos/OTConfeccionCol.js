import React from "react";
import { stkrubroleeconfgrp } from "../../../Stock/Rubros/StkRubroLeeConfGrp";

export async function OTConfeccionCol() {
  // var cuallee = 'D'
  var StkRubroCodGrp = 15

  const stkgrpsogach = await stkrubroleeconfgrp(StkRubroCodGrp);


  var sogachicote = await stkgrpsogach.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = [cur.StkRubroDesc, ' -> ', cur.StkItemsDesc];
    return acc;
  }, {});


  var StkRubroCodGrp = 8

  const stkgrpojal = await stkrubroleeconfgrp(StkRubroCodGrp);


  var tipoojalee = await stkgrpojal.reduce(function (acc, cur) {

    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});

  const tipodobl = { 'cs': 'c/s', 'ss': 's/s' }
  const tiporef = { 'Trg': 'Triangulo', 'CorC': 'Cor.Chico', 'CorG': 'Cor.Grande', 'Tabl': 'Tablita' }
  const plaqsn = { 'S': 'SI', 'N': 'NO', 'PM': 'Plaq.Mayorista' }
  return columnsFill(sogachicote, tipodobl, tipoojalee, tiporef, plaqsn);
}
// var titulo1 = "Dobladillo"
// var field1 = 'tipoconf'
// var titulo2 = "Refuerzo"
// var field2 = 'tiporfzo'

function columnsFill(sogachicote, tipodobl, tipoojalee, tiporef, plaqsn) {
  return new Promise(function (resolve) {
    resolve([
      { title: "Dobladillo", field: 'tipoconf', lookup: tipodobl, },
      { title: "Refuerzo", field: 'tiporfzo', lookup: tiporef, },
      { title: "Ojales", field: 'tipoojale', },
      { title: "Ojales", field: 'tipoojalee', lookup: tipoojalee, },
      { title: "Material", field: 'StkRubroAbr', },
      { title: "Largo Chicotes", field: 'lchicotes', },
      { title: "Soga Chicotes", field: 'sogachicote', lookup: sogachicote, },
      { title: "Plaqueta", field: 'plaqueta', lookup: plaqsn, },
    ]);
  });
}
// }
