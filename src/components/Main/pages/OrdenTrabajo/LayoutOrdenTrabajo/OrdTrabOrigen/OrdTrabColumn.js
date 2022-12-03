
export async function OrdTrabColumn(datositems) {
    console.log('datositems  ', datositems)

    // const datositems = await OrdTrabLeeItems(ordtrabmaterial);

    // var objdatositems = await datositems.reduce(function (acc, cur) {
    //     acc[cur.StkItemsDesc] = cur.StkItemsDesc;
    //     return acc;
    //     // return Object.values(acc).sort();
    // }, {});




    return new Promise(function (resolve) {
        resolve([
            {
                title: "Item",
                field: "ordtrabitem",
            },
            {
                title: "Cantidad",
                field: "ordtrabcantidad",
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
                title: "Importe s/IVA",
                field: "ordtrabimpsiva",
                type: "currency"
            },
            {
                title: "Importe c/IVA",
                field: "ordtrabimpciva",
                type: "currency"
            },
            {
                title: "Material",
                field: "ordtrabmaterial",

            }

        ]);
    });
}
