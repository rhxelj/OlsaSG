
import React, { useState, useEffect } from "react";
export function useSumar(datosrenglon) {
    var totalordciva = 0,
        totalordsiva = 0,
        i = 0;

    while (i < datosrenglon.length) {
        totalordciva = totalordciva * 1 + datosrenglon[i].ordtrabimpciva * 1;
        totalordsiva = totalordsiva * 1 + datosrenglon[i].ordtrabimpsiva * 1;
        i++;
    }
    // settotalordCiva(totalordciva);
    // settotalordSiva(totalordsiva);

    return { totalordciva, totalordsiva }
}