import { stkrubroleeconfgrp } from "../../../Stock/Rubros/StkRubroLeeConfGrp";



export async function OTEnrollableCol() {


  var StkRubroCodGrp = 4

  const stkgrpsogach = await stkrubroleeconfgrp(StkRubroCodGrp);


  var cristal = await stkgrpsogach.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});


  var StkRubroCodGrp = 8

  const stkgrpojal = await stkrubroleeconfgrp(StkRubroCodGrp);

  var tipoojalee = await stkgrpojal.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});

  var StkRubroCodGrp = 1
  const colorv = await stkrubroleeconfgrp(StkRubroCodGrp);

  var colorvivo = await colorv.reduce(function (acc, cur) {
    acc[cur.StkItemsDesc] = cur.StkItemsDesc;
    return acc;
  }, {});



  const tamfajap = { '1P': '1P', '1 1/4P': '1 1/4P', '2P': '2P', '2,5P': '2 1/2 P' }
  const altovol = { '0': 'sin vol', '20': '20 cm', '25': '25 cm', '30': '30 cm', '35': '35 cm' }

  const vivot = {
    'OB': 'Onda Baja',
    'OH': 'Onda Huevito',
    'OBI': 'Onda Baja Invertida'

  }

  const plaqsn = { 'S': 'SI', 'N': 'NO', 'PM': 'Plaq.Mayorista' }
  return columnsFill(tamfajap, cristal, tipoojalee, altovol, vivot, colorvivo, plaqsn);
}
var titulo1 = "Dobladillo"


function columnsFill(tamfajap, cristal, tipoojalee, altovol, vivot, colorvivo, plaqsn) {
  return new Promise(function (resolve) {
    resolve([
      { title: "Faja Superior", field: 'tamfajas', lookup: tamfajap, },
      { title: "Faja Inferior", field: 'tamfajai', lookup: tamfajap, },
      { title: "Cristal", field: 'cristal', lookup: cristal, },
      { title: "Ojales", field: 'tipoojalee', lookup: tipoojalee, },
      { title: "Alto Volado", field: 'altovolado', lookup: altovol, },
      { title: "Marco de", field: 'sobrantemarco', type: "numeric", },
      { title: "Vivo", field: 'vivo', lookup: vivot, },
      { title: "Color Vivo", field: 'color', lookup: colorvivo, },
      { title: "Soga tipo", field: 'StkRubroAbr', },
      { title: "Plaqueta", field: 'plaqueta', lookup: plaqsn, },
    ],);
  });
}

