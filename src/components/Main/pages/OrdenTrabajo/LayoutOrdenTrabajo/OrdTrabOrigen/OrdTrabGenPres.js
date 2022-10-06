import React, { useEffect, useState } from "react";

import { presuprenglonleer } from "../../../Presupuesto/LayoutPresupuesto/PrespuConMod/PresupRenglonLeer";
import { presupencableenro } from "../../../Presupuesto/LayoutPresupuesto/PrespuConMod/PresupEncabLeeNro";
// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";
import { startOfDecade } from "date-fns";


export default function OrdTrabGenPres(props) {
    const { state, setState } = useContext(OrdenTrabajoPantContext);
    // const [datosencab, setDatosencab] = setState([])
    const [datosrenglon, setDatosrenglon] = useState([])
    var presup = props.Presup

    async function leerenglones(presup) {
        const result = await presuprenglonleer(presup);
        setState({ ...state, datosreng: result })
        setDatosrenglon(result)
        console.log('result.length  ', result.length)
        var datospresup = JSON.parse(result[0].PresupRenglonParamInt)
        console.log('datospresup  ', datospresup)
        // console.log('datospresup StkRubroAbr ', datospresup[0].StkRubroAbr)
    }

    async function leerencab(presup) {
        const result = await presupencableenro(presup);
        //      setRenglon({ ...renglon, datarenglon: result });
        setState({ ...state, datosencab: result })
    }
    useEffect(() => {
        leerenglones(presup);
        leerencab(presup);
    }, [presup]); // eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        <h1>OrdeTrabGenPres </h1>
        <h2>{presup}</h2>
        {console.log('state.datosencab  ', state.datosencab)}
        {console.log('state.datosreng  ', state.datosreng)}


    </>)
}