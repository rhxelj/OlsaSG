import React, { useState, useEffect } from "react";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import MaterialTable from "material-table";
import BotonEstilo from '../../../../../../Styles/Boton.module.css'
import { presuprenglonleer } from "./PresupRenglonLeer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function TablaMuestraRenglon(props) {
    const { open, handleClose, Presup } = props;
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

    useEffect(() => {
        leerenglones(Presup);
    }, [Presup]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <Dialog
            fullWidth={true}
            // maxWidth={'xl'}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {/* <DialogTitle id="alert-dialog-slide-title">
                Renglones de Presupuesto
            </DialogTitle> */}
            <DialogContent>
                <MaterialTable
                    icons={tableIcons}
                    localization={localization}
                    title=""
                    columns={renglon.columns}
                    data={renglon.datarenglon}
                ></MaterialTable>
            </DialogContent>
            <button onClick={handleClose} className={BotonEstilo.botoncerrar}>
                Cerrar
            </button>
        </Dialog>
    );
}