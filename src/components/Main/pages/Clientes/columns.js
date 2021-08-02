// import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoProv } from "./LeeTipoClien";

export async function llenarColumns() {
  const tipoprov = await leeTipoProv();
  var objstktipoprov = await tipoprov.reduce(function (acc, cur) {
    acc[cur.idSubRubro] = cur.SubRubroDetalle;
    // return acc;
    return Object.values(acc).sort(function (a, b) {
      return acc[a] - acc[b];
    });
  }, {});

  // const stkMonedas = await stkMonedasleerRed();
  // var objstkMonedas = await stkMonedas.reduce(function (acc, cur, i) {
  //   acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
  //   return acc;
  // }, {});

  return columnsFill(objstktipoprov);
  //, objstkMonedas);
}
//idClientes, ClientesDesc, ClientesDomicilio, ClientesCodPos, 
//ClientesLoc, ClientesPcia, ClientesTel, ClientesMail, ClientesIVA, 
//ClientesCUIT, ClientesTipo, ClientesContacto, ClientesCategoria, 
//ClientesObserv1, ClientesObserv2, ClientesFecha

function columnsFill(objstktipoprov) {
  return new Promise(function (resolve) {
    resolve([
      // { title: "idProveedores", field: "idProveedores" },
      // { title: "Tipo", field: "ProveedoresTipo" }, //Proveedores Tipo idStkTipoProveed
      // width: "80%",
      { title: "Cód", field: "idClientes", width: "25%", defaultGroupOrder: 1 },
      { title: "Descripción", field: "ClientesDesc", width: "130%", defaultGroupOrder: 0 },
      { title: "Domicilio", field: "ClientesDomicilio", width: "150%", defaultValue: "" },
      { title: "CodPos", field: "ClientesCodPos", width: "50%", defaultValue: "" },
      { title: "Loc", field: "ClientesLoc", width: "50%", defaultValue: "" },
      { title: "Pcia", field: "ClientesPcia", width: "50%", defaultValue: "" },
      { title: "Tel-WA", field: "ClientesTel", width: "100%", defaultValue: "" },
      { title: "IVA", field: "ClientesIVA", width: "50%", defaultValue: "" },
      { title: "CUIT", field: "ClientesCUIT", width: "100%", defaultValue: "" },
      { title: "Mail", field: "ClientesMail", width: "50%", defaultValue: "" },
      { title: "Tipo", field: "ClientesTipo", width: "50%", lookup: objstktipoprov },
      { title: "Contacto", field: "ClientesContacto", width: "50%", defaultValue: "" },
      { title: "Categoría", field: "ClientesCategoria", width: "50%", defaultValue: "" },
      { title: "Observación", field: "ClientesObserv1", width: "50%", defaultValue: "" },
      { title: "Observación", field: "ClientesObserv2", width: "50%", defaultValue: "" },
      { title: "Fecha", field: "ClientesFecha", width: "50%", defaultValue: "" },
    ]);
  });
}
