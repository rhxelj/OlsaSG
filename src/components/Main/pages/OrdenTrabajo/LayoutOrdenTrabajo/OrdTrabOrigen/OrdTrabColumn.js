import React from "react";
export async function OrdTrabColumn() {

    return new Promise(function (resolve) {


        resolve(

            [{
                title: "Item",
                field: "ordtrabitem",
                editable: 'never',
                width: 2,
            },
            {
                title: "Cantidad",
                field: "ordtrabcantidad",
                type: 'numeric',
                width: 2,
                // editComponent: (props) => (
                //     <input
                //         maxLength="2"
                //         value={props.value}
                //         onChange={(e) => props.onChange(e.target.value)}
                //     />
                // ),
            },
            {
                title: "Descripción",
                field: "ordtrabdescripcion",
                width: 400,
            },
            // {
            //     title: "Material",
            //     field: "materialselec",
            //     editable: 'never',
            //     width: 10,

            // },
            // {
            //     title: "Color",
            //     field: "colorselec",
            //     editable: 'never',
            //     width: 20,

            // },
            {
                title: "Largo",
                field: "ordtrablargo",
                width: 10,
            },
            {
                title: "Ancho",
                field: "ordtrabancho",
                width: 10,
            },
            {
                title: "Imp.Unit s/IVA",
                field: "ordtrabimpitemsiva",
                type: "currency",
                editable: 'never',
                width: 20,
            },
            {
                title: "Imp.Unit c/IVA",
                field: "ordtrabimpitemciva",
                type: "currency",
                width: 20,
            },


            {
                title: "Importe s/IVA",
                field: "ordtrabimpsiva",
                type: "currency",
                editable: 'never',
                width: 20,
            },
            {
                title: "Importe c/IVA",
                field: "ordtrabimpciva",
                type: "currency",
                width: 20,
            },

            ]);
    });
}
