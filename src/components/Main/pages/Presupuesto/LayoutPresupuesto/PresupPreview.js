
// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from 'react';
import { Dialog } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography';
import BCierraDialogo from '../../../../../Styles/Boton.module.css'
import { tableIcons } from '../../../../lib/material-table/tableIcons'
import WavesIcon from "@material-ui/icons/Waves";


import {
    blue,
    green,
    purple,
    red,
    teal,
} from "@material-ui/core/colors";
// export default function PresupPreview(props) {
export const PresupPreview = (props) => {
    function cierradialogo() {
        props.setOpen({ ppreview: false });
    }

    return (
        <div>

            <Dialog
                fullScreen
                open={props.open}

            >
                <MuiDialogTitle>
                    <button
                        variant="contained"
                        // color="secondary"
                        //startIcon={<tableIcons.AddShoppingCart />}
                        onClick={cierradialogo}
                        className={BCierraDialogo.botoncierradialogo}
                    >
                        <div className={BCierraDialogo.iconocierradialogo}>
                            <tableIcons.Close />
                            {/* style={{ color: red[0], width: 30, height: 30 }} */}
                        </div>
                        Cerrar
                    </button>

                    {/* <IconButton onClick={cierradialogo} color='primary' edge='start' size='small'> */}
                    {/* <CloseIcon />
                        Cierra Impresión */}
                    {/* <Typography variant="subtitle2">Cierra Impresión</Typography> */}

                </MuiDialogTitle>

                <object
                    // data={require('../../../../../docspdf/basics.pdf')}

                    //  data={require('../../../../../docspdf/basics.pdf')}
                    data={require('../static/media/basics.pdf')}
                    type="application/pdf"
                    width='100%'
                    height='100%'
                    cache='false'
                >
                </object>
                {/* {alert('al final de presupPreview')} */}
            </Dialog>
        </div >
    );

}

