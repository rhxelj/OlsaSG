import React, { useState } from "react";
import { stkrubroleeconfgrp } from "../../Stock/Rubros/StkRubroLeeConfGrp"
export async function useBuscaDatos() {

    // export function useBuscaDatos() {
    var cuallee = 'D'
    var StkRubroCodGrp = 'SOG'
    var tiposoga
    // async function stkrubroleerconf(cuallee, StkRubroCodGrp) {
    const result = await stkrubroleeconfgrp(cuallee, StkRubroCodGrp);
    tiposoga = result
    tiposoga = await result.reduce(function (acc, cur) {
        acc[cur.StkRubroAbr] = cur.StkRubroDesc;
        return acc;
    }, {});
    return (tiposoga);
}
// var tiposoga = busquedadedatos()
// console.log(' tiposoga useBuscaDatos ', tiposoga)
// return { tiposoga }

// return { tiposoga }
// }