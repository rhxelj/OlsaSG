
import { ClientesLeerPresup } from "../../../Clientes/ClientesLeerPresup"

export async function presupColumns() {

    const cliente = await ClientesLeerPresup();

    /*  Failed prop type: Invalid prop `columns[0].type` of value `number` supplied to `MaterialTable`, expected one of ["string","boolean","numeric","date","datetime","time","currency"*/

    var objcliente = await cliente.reduce(function (acc, cur) {
        acc[cur.PresupEncabCliente] = cur.ClientesDesc;
        return acc;
    }, {});

    return columnsFill(objcliente)
}
function columnsFill(objcliente) {
    return new Promise(function (resolve) {
        resolve([
            {
                title: "Presupuesto Nro",
                field: "idPresupEncab",
                editable: "never",
                type: "numeric",
                order: true,
            },
            {
                title: "Cliente Temporal ",
                field: "PresupEncabCliente",
                type: "string",
                native: true,

            },
            {
                title: "Cliente ",
                field: "PresupEncabCliente",
                lookup: objcliente,
                native: true,

            },

            {
                title: "Fecha",
                field: "PresupEncabFecha",
                type: "date",
                order: true,
            },
            {
                title: "MayMin",
                field: "PresupEncabMayMin",
                type: "string",

            },
            {
                title: "Total",
                field: "PresupEncabTotal",
                type: "numeric",

            },
            {
                title: "Explicación",
                field: "PresupEncabExplic",
                type: "string",

            },

        ]);
    });
}
