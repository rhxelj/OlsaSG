import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../OrdTrabDatosPresup/OrdTrabDatosPresup";
import { TextField } from "@mui/material";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});


export default function OrdTrabArmaImpresion(props) {
    const { state, useState } = useContext(OrdenTrabajoPantContext)
    const { tabladetalles, setTablaDetalles } = useContext(OrdenTrabajoPantContext);
    const { datosencab } = useContext(OrdenTrabajoPantContext);
    const { datosrenglon } = useContext(OrdenTrabajoPantContext);

    const { open, handleClose } = props;
    const classes = useStyles();
    // console.log(' DatosDetalles ', DatosDetalles)
    // console.log('DatosPpales  ', DatosPpales)
    // console.log('Columnas  ', Columnas)
    console.log('tabladetalles OrdTrabArmaImpresion ', tabladetalles)
    console.log('nrofact  ', state.nrofact)

    console.log('totalciva  ', state.totalordciva)
    console.log('totalsiva  ', state.totalordsiva)
    console.log('impsenia  ', state.impsenia)

    console.log('datosencab OrdTrabArmaImpresion ', datosencab)

    console.log('datosrenglon OrdTrabArmaImpresion ', datosrenglon)

    async function buscadatos() {

        if (tabladetalles[0].tipopresup === "CONFECCIONADA") {
            console.log('está en Confeccionada  ')
        }
        if (tabladetalles[0].tipopresup === "LONAS ENROLLABLES") {
            console.log(' esta en "LONAS ENROLLABLES"  ')

        }

    }


    useEffect(() => {
        buscadatos()

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className={classes.root}>
            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                open={open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form>
                    <TextField
                        label="Size"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                asdf
                            </InputAdornment>
                        }}
                    />
                    {/* <TextField
                        label='Cliente'
                        value={datosencab[0].PresupEncabCliente}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                        }}>
                    </TextField> */}
                    <TextField label='Presup Origen' value={datosencab[0].idPresupEncab}></TextField>
                    <TextField label='Imp. Total' value={datosencab[0].PresupEncabCliente}></TextField>

                    <label>{datosencab[0].PresupEncabCliente}</label>
                    <label>{datosencab[0].idPresupEncab}</label>

                </form >
            </Dialog >

        </div >
    )


};

