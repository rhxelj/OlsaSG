import React, { useEffect, useState } from "react";

import { presuprenglonleer } from "../../../Presupuesto/LayoutPresupuesto/PrespuConMod/PresupRenglonLeer";
import { presupencableenro } from "../../../Presupuesto/LayoutPresupuesto/PrespuConMod/PresupEncabLeeNro";
// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";
import { startOfDecade } from "date-fns";
import TablaMuestraRenglon from "../../../Presupuesto/LayoutPresupuesto/PrespuConMod/TablaMuestraRenglon";

export default function OrdTrabGenPres(props) {
    const { state, setState } = useContext(OrdenTrabajoPantContext);
    // const [datosencab, setDatosencab] = setState([])
    const [datosrenglon, setDatosrenglon] = useState([])
    const [open, setOpen] = useState(open);
    const [parampresupuesto, setParamPresupuesto] = useState({
        idpresupuesto: 0,
    });
    var presup = props.Presup

    async function leerenglones(presup) {
        const result = await presuprenglonleer(presup);
        setState({ ...state, datosreng: result })
        setDatosrenglon(result)
        //var datospresup = JSON.parse(result[0].PresupRenglonParamInt)
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


    const openApp = (event, idPresupEncab) => {
        setParamPresupuesto({ parampresupuesto, idpresupuesto: idPresupEncab });
        handleClickOpen();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setParamPresupuesto({ parampresupuesto, idpresupuesto: 1 });
        setOpen(false);
    };

    return (<>
        <h1>OrdeTrabGenPres viene</h1>
        <h2>{presup}</h2>
        {/* traer el muestra renglones */}
        <TablaMuestraRenglon
            open={true}
            handleClose={handleClose}
            Presup={parampresupuesto.idpresupuesto}
        />
    </>)
}