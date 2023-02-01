
import React, { useState, useEffect } from "react";
export function useSumar(datosrenglon) {
    var tototciva = 0,
        tototsiva = 0,
        i = 0;

    while (i < datosrenglon.length) {
        tototciva = tototciva * 1 + datosrenglon[i].ordtrabimpciva * 1;
        tototsiva = tototsiva * 1 + datosrenglon[i].ordtrabimpsiva * 1;
        i++;
    }
    // setTotalCiva(tototciva);
    // setTotalSiva(tototsiva);

    return { tototciva, tototsiva }
}