import React from "react";
import { stkrubroleeconfgrp } from "../../../Stock/Rubros/StkRubroLeeConfGrp";
import TableChartIcon from '@material-ui/icons/TableChart';
import { Icon } from "@material-ui/core";
export async function OTEnrollableCol() {

  var StkRubroCodGrp = 1

  const stkgrpmaterial = await stkrubroleeconfgrp(StkRubroCodGrp);


  var material = await stkgrpmaterial.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    // cur.StkRubroDesc,
    return acc;
  }, {});


  var StkRubroCodGrp = 4

  const stkgrpsogach = await stkrubroleeconfgrp(StkRubroCodGrp);


  var cristal = await stkgrpsogach.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    // cur.StkRubroDesc,
    return acc;
  }, {});


  var StkRubroCodGrp = 8
  var StkRubroAbr = ' '

  const stkgrpojal = await stkrubroleeconfgrp(StkRubroCodGrp);

  var tipoojalee = await stkgrpojal.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});

  var StkRubroCodGrp = 1
  // var StkRubroAbr = 'ST840'
  const colorv = await stkrubroleeconfgrp(StkRubroCodGrp);

  var colorvivo = await colorv.reduce(function (acc, cur) {
    acc[cur.idStkItems] = cur.StkItemsDesc;
    return acc;
  }, {});


  // async function eligecolor(event, materialelegido) {
  //   const result = await OrdTrabLeeItems(materialelegido.ordtrabmaterial);
  //   setState({ ...state, datositems: result });
  //   indiceitem1 = materialelegido.ordtrabitem - 1
  //   setIndiceItem(indiceitem1)
  //   abrecierracolor()
  // }


  var StkRubroCodGrp = 1
  // var StkRubroAbr = 'ST840'
  const colormaterial = await stkrubroleeconfgrp(StkRubroCodGrp);

  var cmaterial = await colormaterial.reduce(function (acc, cur) {
    acc[cur.idStkItems] = cur.StkItemsDesc;
    return acc;
  }, {});

  const tamfajap = { '2P': '2P', '2,5P': '2 1/2 P' }
  const altovol = { '0': 'sin vol', '20': '20 cm', '25': '25 cm', '30': '30 cm', '35': '35 cm' }

  const vivot = {
    'OB': 'Onda Baja',
    'OH': 'Onda Huevito',
    'OBI': 'Onda Baja Invertida'
    // <object

    //   data={require('../../../static/media/CROQUIS.pdf')}
    //   type="application/pdf"
    //   width='100%'
    //   height='100%'
    //   cache='false'
    // >
    // </object>
    //   <img
    //   src={'/home/sandra/Imágenes/vivo1.jpg'}
    // />
  }
  const plaqsn = { 'S': 'SI', 'N': 'NO', 'PM': 'Plaq.Mayorista' }
  return columnsFill(material, tamfajap, cristal, tipoojalee, altovol, vivot, colorvivo, plaqsn, cmaterial);
}
var titulo1 = "Dobladillo"

function columnsFill(material, tamfajap, cristal, tipoojalee, altovol, vivot, colorvivo, plaqsn, cmaterial) {
  return new Promise(function (resolve) {
    resolve([
      // { title: "TipoPrespuesto", field: 'tipopresup', },
      // { title: "Cantidad", field: 'cantidad', },
      // { title: "Ancho", field: 'ancho', },
      // { title: "Largo", field: 'largo', },
      {
        title: "Material", field: 'StkRubroAbr', lookup: material,

        //   render: (rowData) => { console.log('rowData Material ', rowData) }
        // editComponent: props => {
        //   return (
        //     <div>{console.log('props Material ', props)}</div>
        //     // onChange={props.onChange}
        //   );
        // }
      },
      {
        title: "Color",
        field: 'colormaterial',
        lookup: cmaterial,
      },
      // render: (rowData) => { console.log('rowData  ', rowData) }
      // editComponent: (props) => (
      //   <div>{console.log('props Color ', props.rowData.StkRubroAbr)}
      //     {console.log('props.value ', props.value)}
      //     <input
      //       maxLength="5"
      //       label={props.rowData.StkRubroAbr}
      //       value={props.value}
      //       onChange={(e) => props.onChange(e.target.value)}
      //     />
      //   </div>
      // ),

      { title: "Faja Superior", field: 'tamfajas', lookup: tamfajap, },
      { title: "Faja Inferior", field: 'tamfajai', lookup: tamfajap, },
      { title: "Cristal", field: 'cristal', lookup: cristal, },
      { title: "Ojales", field: 'tipoojalee', lookup: tipoojalee, },
      { title: "Alto Volado", field: 'altovolado', lookup: altovol, },
      { title: "Marco de", field: 'sobrantemarco', type: "numeric", },
      {
        title: "Vivo", field: 'vivo', lookup: vivot,
      },
      { title: "Color Vivo", field: 'color', lookup: colorvivo, },
      { title: "Soga tipo", field: 'StkRubroAbr', },
      { title: "Plaqueta", field: 'plaqueta', lookup: plaqsn, },
    ],);
  });
}

