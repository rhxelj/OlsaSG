export function presupdetpieColumns() {
    return new Promise(function (resolve) {
        resolve([

            {
                title: "Leyenda",
                field: "PresupDetPieLeyenda",
                length: 70,
                // width: 150,
                order: true,
            },

        ]);
    });
}
