import React, { useState, useEffect } from "react";

import { stkrubroleeconfgrp } from "../../../Stock/Rubros/StkRubroLeeConfGrp"

var cuallee = 'D'
var StkRubroCodGrp = 'SOG'
async function stkrubroleerconf(cuallee, StkRubroCodGrp) {
    const result = await stkrubroleeconfgrp(cuallee, StkRubroCodGrp);
    console.log('result  ', result)
}

// useEffect(() => {
//     stkrubroleerconf(cuallee, StkRubroCodGrp)

// }, []); // eslint-disable-line react-hooks/exhaustive-deps

// export const datoslonas = (objstkgrupos) => {
export const datoslonas = {
    datlonasenrollables:
        [{
            // tipopresup: '',
            // cantidad: 1,
            // ancho: 0,
            // largo: 0,
            tamfaja: "2P",
            tamcristal: 0,
            StkRubroAbr: '',
            altovolado: 0,
            sobrantemarco: 0,
            datositems: '',
            color: '',
            StkRubroAbr: ''
        }]
    ,
    cdatlonasenrollables: [
        // { title: "TipoPrespuesto", field: 'tipopresup', },
        // { title: "Cantidad", field: 'cantidad', },
        // { title: "Ancho", field: 'ancho', },
        // { title: "Largo", field: 'largo', },
        { title: "Faja Superior", field: 'tamfaja', },
        { title: "Cristal", field: 'tamcristal', },
        { title: "Material", field: 'StkRubroAbr', },
        { title: "Alto Volado", field: 'altovolado', },
        { title: "Marco de", field: 'sobrantemarco', },
        { title: "Color", field: 'color', },
        { title: "Soga tipo", field: 'StkRubroAbr', }
    ],
    datlonasconfeccion:
        [{
            // tipopresup: '',
            // cantidad: 1,
            // ancho: 0,
            // largo: 0,
            tipoconf: "",
            tipoojale: 0,
            StkRubroAbr: '',
            lchicotes: 1.5,
            schicotes: 0,
            datositems: '',
            // color: ''
        }
        ]
    ,
    cdatlonasconfeccion: [
        // { title: "TipoPrespuesto", field: 'tipopresup', },
        // { title: "Cantidad", field: 'cantidad', },
        // { title: "Ancho", field: 'ancho', },
        // { title: "Largo", field: 'largo', },
        { title: "Dobladillo", field: 'tipoconf', lookup: { 'cs': 'c/s', 'ss': 's/s' }, },
        { title: "Ojales", field: 'tipoojale', },
        { title: "Material", field: 'StkRubroAbr', },
        { title: "Largo Chicotes", field: 'lchicotes', },
        { title: "Soga Chicotes", field: 'schicotes', },
        // { title: "Color", field: 'color', },
    ],

    datunidad: [
        {

            tipopresup: '',
            cantidad: 1,
            ancho: 0,
            largo: 0,
            tamfaja: " ",
            tamcristal: 0,
            StkRubroAbr: '',
            altovolado: 0,
            sobrantemarco: 0,
            datositems: ''
        }
    ],
    cdatunidad: [
        { title: "TipoPrespuesto", field: 'tipopresup', },
        { title: "Cantidad", field: 'cantidad', },
        { title: "Material", field: 'StkRubroAbr', },
    ]
}

/*
StkRubroAbr: "ST840"
alto: 1.1
altovolado: 20
ancho: "4"
anchocomedero: "0.68"
anchon: 0
anchopared: 0
cantbrazos: 0
cantidad: 1
detallep: ""
detaller: ""
drenajesn: "cd"
ivasn: "CIVA"
largo: "2.1"
largobrazo: 0
largon: 0
lonanuestraafuera: "LN"
medida: 0
minmay: "mn"
presupojalesc: 20
sobrantemarco: 20
stkrubroabrtbr: "TBR07"
tamcristal: "PVC06"
tamfaja: "2P"
termbordeeleg: "SF"
tipoconf: "cs"
tipomecanismo: "MotorCT"
tipomedeleg: "CC"
tipoojale: "hz"
tipopresup: "TOLDO BARRACUADRA"
voladosd: "S"
*/