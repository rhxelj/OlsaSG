import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import MaterialTable from "material-table";
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { OrdTrabColumn } from "../OrdTrabOrigen/OrdTrabColumn";
import { DatosEncabPresupEleg } from '../OrdTrabOrigen/DatosEncabPresupEleg'
import { OrdTrabLeeItems } from "../OrdTrabOrigen/OrdTrabLeeItems";
import { Button, TextField } from "@material-ui/core";
// import { initial_state } from "../../Initial_State";
// import { datoslonas } from "../FilasDatos/DatosLonas";
import Grid from "@material-ui/core/Grid";
import estilosot from "../../../OrdenTrabajo/OrdenTrabajo.module.css"
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { makeStyles } from "@material-ui/core/styles";
import {
    blue,
    teal,
    orange
} from "@material-ui/core/colors";
import OrdTrabGeneraOrden from "../OrdTrabGeneraOrden/OrdTrabGeneraOrden";

import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";


const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});




export default function OrdTrabDatosPresup() {
    const { state, setState } = useContext(OrdenTrabajoPantContext);
    console.log('state  ', state)
    return (
        <div >

        </div >
    )


};


