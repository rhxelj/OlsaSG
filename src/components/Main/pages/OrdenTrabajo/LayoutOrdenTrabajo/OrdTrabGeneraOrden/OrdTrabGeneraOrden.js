import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import MaterialTable from "material-table";
import { Button, TextField } from "@material-ui/core";
import { initial_state } from "../../Initial_State";
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { datoslonas } from "../FilasDatos/DatosLonas";
import { OrdTrabLeeItems } from "../OrdTrabOrigen/OrdTrabLeeItems";
import {
    teal,
    orange
} from "@material-ui/core/colors";
export default function OrdTrabGeneraOrden(props) {


    const { open, handleClose, Detalles, idTablaDetalles } = props;
    const [abrecolor, setAbreColor] = useState(false)
    const [state, setState] = useState(initial_state)
    const [colorselec, setColorSelec] = useState('')
    var indiceitem1 = 0
    const [indiceitem, setIndiceItem] = useState(0)
    //  const [datostabladef, setDatosTabladef] = useState([])
    var datostabladef = []
    var columtabladef = []
    var cambcolum = false
    var ie = 0, ic = 0


    // for (var i = 0; i < Detalles.length; i++) {
    //     if (Detalles[i].tipopresup === "LONAS ENROLLABLES") {
    //         datoslonas.datlonasenrollables[0].ancho = Detalles[i].ancho
    //         datoslonas.datlonasenrollables[0].largo = Detalles[i].largo
    //         datoslonas.datlonasenrollables[0].altovolado = Detalles[i].altovolado
    //         datoslonas.datlonasenrollables[0].sobrantemarco = Detalles[i].sobrantemarco

    //     } if (Detalles[i].tipopresup === "CONFECCIONADA") {
    //         datoslonas.datlonasconfeccion[0].tipopresup = Detalles[i].tipopresup
    //         datoslonas.datlonasconfeccion[0].cantidad = Detalles[i].cantidad
    //         datoslonas.datlonasconfeccion[0].largo = Detalles[i].largo
    //         datoslonas.datlonasconfeccion[0].ancho = Detalles[i].ancho
    //         datoslonas.datlonasconfeccion[0].tipoconf = Detalles[i].tipoconf
    //         datoslonas.datlonasconfeccion[0].tipoojale = Detalles[i].tipoojale
    //         datoslonas.datlonasconfeccion[0].lchicotes = Detalles[i].lchicotes
    //         datoslonas.datlonasconfeccion[0].schicotes = Detalles[i].schicotes
    //         datoslonas.datlonasconfeccion[0].StkRubroAbr = Detalles[i].StkRubroAbr
    //     }
    // }


    const buscadatos = (Detalles, detalmap, index) => {
        cambcolum = !cambcolum
        // if (index === 0) {
        //     ie = 0
        //     ic = 0


        // }
        // for (var i = 0; i <= index; i++) {
        // if (detalles.tipopresup === "LONAS ENROLLABLES") {
        //     datoslonas.datlonasenrollables[ie].ancho = detalles.ancho
        //     datoslonas.datlonasenrollables[ie].largo = detalles.largo
        //     datoslonas.datlonasenrollables[ie].altovolado = detalles.altovolado
        //     datoslonas.datlonasenrollables[ie].sobrantemarco = detalles.sobrantemarco

        //     datostabladef = (datoslonas.datlonasenrollables)
        //     // columtabladef = (datoslonas.cdatlonasenrollables)
        //     if (ie === 0) {
        //         columtabladef = (datoslonas.cdatlonasenrollables)
        //     }
        //     // ie++
        // }
        datostabladef[0] = Detalles[idTablaDetalles]

        // setDatosTabladef(Detalles)

        if (detalmap.tipopresup === "CONFECCIONADA") {
            columtabladef = (datoslonas.cdatlonasconfeccion)
            //setState({ ...state, nuevascolumnas: columtabladef[0] });
        }
        if (detalmap.tipopresup === "LONAS ENROLLABLES") {
            columtabladef = (datoslonas.cdatlonasenrollables)
        }

        // datoslonas.datlonasconfeccion = detalles
        // datoslonas.datlonasconfeccion[ic].tipopresup = detalles.tipopresup
        // datoslonas.datlonasconfeccion[ic].cantidad = detalles.cantidad
        // datoslonas.datlonasconfeccion[ic].largo = detalles.largo
        // datoslonas.datlonasconfeccion[ic].ancho = detalles.ancho
        // datoslonas.datlonasconfeccion[ic].tipoconf = detalles.tipoconf
        // datoslonas.datlonasconfeccion[ic].tipoojale = detalles.tipoojale
        // datoslonas.datlonasconfeccion[ic].lchicotes = detalles.lchicotes
        // datoslonas.datlonasconfeccion[ic].schicotes = detalles.schicotes
        // datoslonas.datlonasconfeccion[ic].StkRubroAbr = detalles.StkRubroAbr
        // datoslonas.datlonasconfeccion[ic].color = colorselec
        // datostabladef = (datoslonas.datlonasconfeccion)
        // columtabladef = (datoslonas.cdatlonasconfeccion)
        // if (ic === 0) {
        //     columtabladef = (datoslonas.cdatlonasconfeccion)
        // }
        // ic++

        // }

    }


    return (
        <>
            <Dialog
                width="100%"
                height="315"
                maxWidth={'xl'}
                // className={DialogoEstilo.dialogo}
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            // aria-labelledby="alert-dialog-slide-title"
            // aria-describedby="alert-dialog-slide-description"
            >

                {Detalles.map((detalmap, index) => (
                    <div>
                        {buscadatos(Detalles, detalmap, index)}
                        {cambcolum &&

                            <MaterialTable
                                title=""
                                columns={columtabladef}
                                data={datostabladef}
                                icons={tableIcons}
                                localization={localization}


                            ></MaterialTable>

                        }
                        <div> {!columtabladef}</div>
                    </div>
                ))}
                {/* <MaterialTable
                    title=""
                    columns={datoslonas.cdatlonasconfeccion}
                    data={Detalles}
                    icons={tableIcons}
                    localization={localization}

                    actions={[

                        {
                            icon: () => (
                                <tableIcons.Palette
                                    style={{ color: orange[500], fontSize: 40 }} />
                            ),
                            tooltip: "Colores",
                            onClick: (event, rowData) => (
                                eligecolor(event, rowData)
                            )
                        }


                    ]}
                ></MaterialTable> */}


                {/* <MaterialTable
                    title=""
                    columns={datoslonas.cdatlonasconfeccion}
                    data={datoslonas.datlonasconfeccion}

                    icons={tableIcons}
                    localization={localization}
                ></MaterialTable> */}
            </Dialog>
            {/* <Dialog
                maxWidth={'xl'}
                open={abrecolor}
                onClose={abrecierracolor}

            >
                {!!textdata &&
                    textdata.map((data) => (
                        <TextField
                            key={data.id}
                            id={data.id}
                            size="small"
                            inputProps={{ maxLength: 3 }}
                            select
                            label={data.label}
                            value={data.value}
                            onChange={handleChange}
                            SelectProps={{ native: true }}
                            variant="outlined"
                            margin="dense"
                        >
                            {data.mapeo}
                        </TextField>
                    ))}
            </Dialog> */}
        </>)

}