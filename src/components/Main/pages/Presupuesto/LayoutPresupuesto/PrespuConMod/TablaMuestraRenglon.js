import React, { useState, useEffect } from "react";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import MaterialTable from "material-table";
import BotonEstilo from '../../../../../../Styles/Boton.module.css'
import DialogoEstilo from '../../../../../../Styles/Dialog.module.css'
import { presuprenglonleer } from "./PresupRenglonLeer";

import MinMay from "../../../OrdenTrabajo/LayoutOrdenTrabajo/MinMay/MinMay";
import OrdTrabDatosPresup from "../../../OrdenTrabajo/LayoutOrdenTrabajo/OrdTrabDatosPresup/OrdTrabDatosPresup"
import { initial_state } from "../../../OrdenTrabajo/Initial_State";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function TablaMuestraRenglon(props) {
    const [ppreview, setPPreview] = useState(false);
    const { open, handleClose, Presup } = props;
    const [renglot, setRenglot] = useState([])

    const [state, setState] = useState(initial_state)
    // console.log('state en tablamuestrarenglon  ', state)
    const [renglon, setRenglon] = useState({
        columns: [
            {
                title: "Cantidad",
                field: "PresupRenglonCant",
            },
            {
                title: "Descripción",
                field: "PresupRenglonDesc",
            },
            {
                title: "Largo",
                field: "PresupRenglonLargo",
                type: "numeric",
            },
            {
                title: "Ancho",
                field: "PresupRenglonAncho",
                type: "numeric",
            },
            {
                title: "Imp.Unit.",
                field: "PresupRenglonImpUnit",
                type: "currency",
            },
            {
                title: "Imp.Item.",
                field: "PresupRenglonImpItem",
                type: "currency",
            },
            {
                title: "desc",
                field: "PresupRenglonParamInt",
            },
        ],

        datarenglon: [],
    });

    async function leerenglones(Presup) {
        const result = await presuprenglonleer(Presup);
        setRenglon({ ...renglon, datarenglon: result });
    }


    function handleOnSelectionChange() {
        var datosrenglon = renglon.datarenglon
        setState({ ...state, opcionpresupeleg: datosrenglon });
    }


    async function ArmaOrdenTrabajo() {
        var datotraido = state.opcionpresupeleg
        setRenglot(datotraido)
        handleClickPreview();
    }
    const handleClickPreview = () => {
        setPPreview(true);
    };

    const handleClosePreview = () => {
        setPPreview(false);
    };

    useEffect(() => {
        leerenglones(Presup);
    }, [Presup]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <Dialog
            fullWidth={true}
            maxWidth={'xl'}
            // className={DialogoEstilo.dialogo}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >

            <DialogContent className={DialogoEstilo.dialogocontenido}>

                <MaterialTable
                    // tableLayout="auto"
                    icons={tableIcons}
                    localization={localization}
                    title=""
                    columns={renglon.columns}
                    data={renglon.datarenglon}
                    onSelectionChange={handleOnSelectionChange}
                    options={{
                        selection: true,
                    }}


                ></MaterialTable>

            </DialogContent>
            <div>
                <button onClick={handleClose} className={BotonEstilo.botoncerrar}>
                    Cerrar
                </button>

                <button onClick={ArmaOrdenTrabajo} className={BotonEstilo.botonabreot}>
                    Orden de Trabajo
                </button>
            </div>

            {ppreview &&
                // < MinMay DatosPresupEleg={renglot} />}
                <OrdTrabDatosPresup DatosPresupEleg={renglot} open={ppreview} handleClose={handleClosePreview} />}

        </Dialog>
    );
}