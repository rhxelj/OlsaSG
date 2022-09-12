import React, { useState } from "react";
import { copiafact } from "./CopiaFact";

import { TextField } from "@material-ui/core";
import swal from 'sweetalert';
import { MenuItem, FormControl } from "@material-ui/core";
import Estilos from './Estilos.module.css'

export default function RecuperaDatos() {
    const [diaeleg, setDiaeleg] = React.useState('');

    const handleChange = (event) => {
        inicio(diasemana[event.target.value].label)
    };

    const diasemana = [
        {
            value: 0,
            label: 'LUNES'
        },
        {
            value: 1,
            label: 'MARTES'
        },
        {
            value: 2,
            label: 'MIERCOLES',
        },
        {
            value: 3,
            label: 'JUEVES',
        },
        {
            value: 4,
            label: 'VIERNES',
        },]


    async function copiafacturacion() {
        const result = await copiafact();
        console.log('result  ', result)
        if (result === '""') {
            swal({
                title: "Backup Realizado!",
                text: "Retirar el PenDrive",
                icon: "success",
                button: "OK!",
            })
            setOpen(false)
        }
        else {
            swal({
                title: "Backup NO Realizado!",
                text: "Atención NO SE HIZO EL BACKUP ",
                text1: result,
                icon: "error",
                button: "OK!",
            })

        }

    }
    const [open, setOpen] = useState(true);



    const inicio = (deldia) => {
        swal({
            title: "Recupera Datos Facturación",
            text: "Del Día : " + deldia,
            icon: "info",
            dangerMode: true,
            buttons: ["No", "SI"],  //el true es el de la derecha
        })
            .then(respuesta => {
                if (respuesta) {
                    copiafacturacion()
                    // swal("Poof! Your imaginary file has been deleted!", {
                    //     icon: "success",
                    // });
                }
            })
    }

    return (
        <FormControl className={Estilos.contenedor2} >
            <h3 className={Estilos.banner}>RECUPERACION DE INFORMACION!!!</h3>
            <TextField className={Estilos.selector}
                id="filled-select-currency"
                select
                label="Día de la Semana"
                value={diaeleg}
                onChange={handleChange}
                helperText="Elegir el día"
                variant="filled"
            >
                {diasemana.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>

    );
}

