import React from "react";
import { stkrubroleeconfgrp } from "../../../Stock/Rubros/StkRubroLeeConfGrp";
import TableChartIcon from '@material-ui/icons/TableChart';
import { Icon } from "@material-ui/core";
export async function OTEnrollableCol() {
  var cuallee = 'D'
  var StkRubroCodGrp = 4

  const stkgrpsogach = await stkrubroleeconfgrp(cuallee, StkRubroCodGrp);


  var cristal = await stkgrpsogach.reduce(function (acc, cur) {
    console.log('acc  ', acc)
    console.log('cur  ', cur)
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    // cur.StkRubroDesc,
    return acc;
  }, {});


  var StkRubroCodGrp = 8

  const stkgrpojal = await stkrubroleeconfgrp(cuallee, StkRubroCodGrp);


  var tipoojalee = await stkgrpojal.reduce(function (acc, cur) {

    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});

  const tamfajap = { '2P': '2P', '2,5P': '2 1/2 P' }
  const altovol = { '0': 'sin vol', '20': '20 cm', '25': '25 cm', '30': '30 cm', '35': '35 cm' }

  const vivot = {
    'OBaja': <Icon>{TableChartIcon}</Icon>
    //   <img
    //   src={'/home/sandra/Imágenes/vivo1.jpg'}
    // />
  }

  return columnsFill(tamfajap, cristal, tipoojalee, altovol, vivot);
}
var titulo1 = "Dobladillo"

function columnsFill(tamfajap, cristal, tipoojalee, altovol, vivot) {
  return new Promise(function (resolve) {
    resolve([
      // { title: "TipoPrespuesto", field: 'tipopresup', },
      // { title: "Cantidad", field: 'cantidad', },
      // { title: "Ancho", field: 'ancho', },
      // { title: "Largo", field: 'largo', },
      { title: "Faja Superior", field: 'tamfaja', lookup: tamfajap, },
      { title: "Cristal", field: 'cristal', lookup: cristal, },
      { title: "Ojales", field: 'tipoojale', },
      { title: "Ojales", field: 'tipoojalee', lookup: tipoojalee, },
      { title: "Material", field: 'StkRubroAbr', },
      { title: "Alto Volado", field: 'altovolado', lookup: altovol, },
      { title: "Marco de", field: 'sobrantemarco', type: "numeric", },
      {
        title: "Vivo", field: 'vivo', lookup: vivot,
      },
      { title: "Color Vivo", field: 'color', },
      { title: "Soga tipo", field: 'StkRubroAbr', }
    ],);
  });
}
// }
