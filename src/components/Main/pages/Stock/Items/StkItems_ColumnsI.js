import { leeStkRubro } from "./leeStkRubro";
import { zhCN } from '@material-ui/core/locale';

export async function StkItems_ColumnsI() {
  const stkRubros = await leeStkRubro(); //llamo a leer grupo
  var objstkrubro = await stkRubros.reduce(function (acc, cur, i) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});
  return columnsFill(objstkrubro);
}
function columnsFill(objstkrubro, objstkgrupo) {
  return new Promise(function (resolve, reject) {
    resolve([
      {
        title: "Items(ID)",
        field: "idStkItems",
        tipo: "numero",
        order: true,
      },
      {
        title: "Grupo",
        field: "StkItemsGrupo",
      },
      {
        title: "Rubro",
        field: "StkItemsRubro",
        tipo: "texto",
        order: true,
      },
      {
        title: "Rubro ",
        field: "StkRubroDesc",
        lookup: objstkrubro,
      },
      {
        title: "Descripción",
        field: "StkItemsDesc",
        tipo: "texto",
        order: true,
      },
      {
        title: "Cantidad",
        field: "StkItemsCantidad",
        tipo: "numero",
        order: true,
      },
      {
        title: "Cantidad Disponible",
        field: "StkItemsCantDisp",
        tipo: "numero",
        order: true,
      },
      {
        title: "Fecha de Actualización",
        field: "StkItemsFAct",
      },
      {
        title: "Stock Mínimo",
        field: "StkItemsMin",
        tipo: "numero",
        order: true,
      },
      {
        title: "Stock Máximo",
        field: "StkItemsMax",
        tipo: "numero",
        order: true,
      },
    ]);
  });
}
// )
// }