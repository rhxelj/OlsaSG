import { isNumericLiteral } from "typescript";
import React from "react";
export async function OrdTrabColumn(renglon1) {
    console.log('renglon1  ', renglon1)
    if (renglon1[0].ordtrabparametros.tipopresup === "CONFECCIONADA") {
        var ocultatipoojale = false
        var editatipoojale = 'always'
        var ocultatamcristal = true
        var editatamcristal = 'never'
    }
    if (renglon1[0].ordtrabparametros.tipopresup === "LONAS ENROLLABLES") {
        var ocultatipoojale = true
        var editatipoojale = 'never'
        var ocultatamcristal = false
        var editatamcristal = 'always'
    }


    // const datositems = await OrdTrabLeeItems(ordtrabmaterial);

    // var objdatositems = await datositems.reduce(function (acc, cur) {
    //     acc[cur.StkItemsDesc] = cur.StkItemsDesc;
    //     return acc;
    //     // return Object.values(acc).sort();
    // }, {});

    var oculta = false
    return new Promise(function (resolve) {
        // if (ordtrabparametros.tipopresup === "CONFECCIONADA") {
        //     var ocultatipoojale = false
        //     var ocultatamcristal = true
        // }

        resolve(

            [{
                title: "Item",
                field: "ordtrabitem",
            },
            {
                title: "Cantidad",
                field: "ordtrabcantidad",
                type: 'numeric',
                editComponent: (props) => (
                    <input
                        maxLength="5"
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                ),
            },
            {
                title: "Descripción",
                field: "ordtrabdescripcion",
            },
            {
                title: "Color",
                field: "colorselec",

            },
            {
                title: "Largo",
                field: "ordtrablargo",
            },
            {
                title: "Ancho",
                field: "ordtrabancho",

            },
            {
                title: "Imp.Unit s/IVA",
                field: "ordtrabimpitemsiva",
                type: "currency",
                editable: 'never',
            },
            {
                title: "Imp.Unit c/IVA",
                field: "ordtrabimpitemciva",
                type: "currency"
            },


            {
                title: "Importe s/IVA",
                field: "ordtrabimpsiva",
                type: "currency",
                editable: 'never',
            },
            {
                title: "Importe c/IVA",
                field: "ordtrabimpciva",
                type: "currency"
            },
            {
                title: "Material",
                field: "ordtrabmaterial",
                hidden: oculta
            },
            // {
            //     title: "Tipo Presup",
            //     field: "ordtrabtipopresup",
            //     editable: 'never',
            // }
            {
                title: "Cristal",
                field: "ordtrabparametros.tamcristal",
                editable: editatamcristal,
                hidden: ocultatamcristal
            },
            {
                title: "Ojales de",
                field: "ordtrabparametros.tipoojale",
                editable: editatipoojale,
                hidden: ocultatipoojale
            },

            ]);
    });
}
